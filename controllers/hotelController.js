import Hotel from "../models/Hotel.js";

//GET

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate("user", "name");
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar hotéis" });
  }
};

// GET/ ID
export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel não encontrado" });
    }
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//POST

export const createHotel = async (req, res) => {
  const { name, location, price } = req.body;

  try {
    const newHotel = new Hotel({ name, location, price, user: req.user.id });
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar hotel" });
  }
};

//PUT

export const updateHotel = async (req, res) => {
  const { id } = req.params;

  try {
    // Primeiro, encontre o hotel para verificar o dono
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel não encontrado" });
    }

    // Verifica se o usuário autenticado é o dono do hotel
    if (hotel.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Ação não permitida" });
    }

    // Se for o dono, então atualiza
    const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(updatedHotel);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar hotel" });
  }
};

//DELETE

export const deleteHotel = async (req, res) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel não encontrado" });
    }

    // Apenas o dono pode deletar
    if (hotel.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Ação não permitida" });
    }

    await Hotel.findByIdAndDelete(id);
    res.json({ message: "Hotel excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao excluir hotel" });
  }
};
