import Testimonial from "../models/Testimonial.js";
export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);

    res.json({
      success: true,
      data: testimonial,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();

    res.json({
      success: true,
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
