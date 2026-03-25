import Note from "../models/Note.js";

export async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort the desc. order newest first
    console.log(notes);
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getNotes controller", error);
    res.status(500).json({ messege: "Internal server error" });
  }
}
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ massage: " note not found" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNotes controller", error);
    res.status(500).json({ messege: "Internal server error" });
  }
}

export async function createNotes(req, res) {
  try {
    console.log(req.body);
    const { title, content } = req.body;

    const note = new Note({ title, content });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error is in createController", error);
    res.status(500).json({ messege: "Internal server error" });
  }
}
export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      {
        new: true,
      },
    );
    if (!updatedNote)
      return res.status(404).json({ massage: "note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error is in updateController", error);
    res.status(500).json({ messege: "Internal server error" });
  }
  // res.status(200).json({ message: "Note updated!" });
}
export async function deleteNotes(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ massage: "note not found" });
    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error is in deleteController", error);
    res.status(500).json({ messege: "Internal server error" });
  }
}
