const ContactsRepository = require("../repositories/ContactsRepository");

class ContactController {
  async index(req, res) {
    const { orderBy } = req.query;

    const contacts = await ContactsRepository.findAll(orderBy);

    return res.json(contacts);
  }

  async show(req, res) {
    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    return res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;

    await ContactsRepository.delete(id);

    return res.sendStatus(204);
  }

  async store(req, res) {
    const { name, email, phone, category_id } = req.body;

    if (!name) return res.status(400).json({ error: "Name is required" });

    const contactExist = await ContactsRepository.findByEmail(email);

    if (contactExist) {
      return res.status(400).json({ error: "Contact already exists" });
    }

    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    return res.status(201).json(contact);
  }

  async update(req, res) {
    const { name, email, phone, category_id } = req.body;

    const { id } = req.params;

    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    const contactExist = await ContactsRepository.findByEmail(email);

    if (contactExist && contactExist.id !== id) {
      return res.status(400).json({ error: "Contact already exists" });
    }

    const contactUpdated = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    return res.json(contactUpdated);
  }
}

module.exports = new ContactController();
