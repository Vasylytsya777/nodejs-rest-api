const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../model/index");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);

    contact
      ? res.json({
          status: "success",
          code: 200,
          data: contact,
        })
      : res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const mandatoryData = ["name", "email", "phone"];
    if (!req.body.name || !req.body.email || !req.body.phone) {
      const errMessage = mandatoryData
        .filter((item) => !Object.keys(req.body).includes(item))
        .reduce((acc, data) => `${acc} missing required ${data} field;`, "");
      return res.status(400).json({
        status: "error",
        code: 400,
        message: errMessage,
      });
    } else {
      const newContact = await addContact(req.body);

      return res.json({
        status: "success",
        code: 201,
        data: newContact,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await removeContact(contactId);

    contact
      ? res.json({
          status: "success",
          code: 200,
          message: "contact deleted",
        })
      : res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
  } catch (err) {
    next(err);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  try {
    if (Object.keys(body).length === 0) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }

    const updatedContact = await updateContact(contactId, body);

    updatedContact
      ? res.json({
          status: "success",
          code: 200,
          data: updatedContact,
        })
      : res.status(404).json({
          status: "error",
          code: 404,
          message: "Not found",
        });
  } catch (error) {
    next(err);
  }
});

module.exports = router;
