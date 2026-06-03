import FashionStory from "../models/FashionStory.js";

// GET ALL STORIES
export const getFashionStories = async (req, res) => {
  try {
    const stories = await FashionStory.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: stories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE STORY
export const createFashionStory = async (req, res) => {
  try {
    const { title, subtitle, link } = req.body;

    const imageFile = req.file;

    const image = imageFile
      ? `${BASE_URL}/uploads/fashion/${imageFile.filename}`
      : "";

    const story = await FashionStory.create({
      title,
      subtitle,
      link,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Fashion story created successfully",
      data: story,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE STORY
export const deleteFashionStory = async (req, res) => {
  try {
    const story = await FashionStory.findByIdAndDelete(req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
