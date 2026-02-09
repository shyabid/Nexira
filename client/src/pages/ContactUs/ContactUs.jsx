import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import MyContainer from "../../components/shared/MyContainer/MyContainer";
import MyInput from "../../components/ui/MyInput/MyInput";
import MyLabel from "../../components/ui/MyLabel/MyLabel";
import useThemeContext from "../../hooks/useThemeContext";
import { FiSend, FiCheckCircle } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";
import gsap from "gsap";
import { faqData } from "../../data/faqData";
import { contactInfo } from "../../data/contactInfo";
import MyButton from "../../components/ui/MyButton/MyButton";

import contactImage from "../../assets/slider2.jpg";

const ContactUs = () => {
  const { theme } = useThemeContext();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const onSubmit = async () => {
    setLoading(true);

    // Simulate form submission
    gsap.to(formRef.current, {
      opacity: 0.5,
      duration: 0.3,
    });

    setTimeout(() => {
      setSubmitted(true);
      reset();

      gsap.to(formRef.current, {
        opacity: 1,
        duration: 0.3,
      });

      setLoading(false);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Header Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`py-8 md:py-14 ${
          theme === "night"
            ? "bg-linear-to-br from-base-900 via-base-800 to-base-900"
            : "bg-linear-to-br from-blue-50 via-purple-50 to-blue-50"
        }`}
      >
        <MyContainer>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-lg md:text-xl opacity-75 max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Reach out
              to us through any of the channels below.
            </p>
          </motion.div>
        </MyContainer>
      </motion.section>

      {/* Contact Info Cards */}
      <section className="py-5 md:py-12">
        <MyContainer>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`p-6 rounded-xl border transition-all duration-300 ${
                    theme === "night"
                      ? "bg-base-800 border-base-700 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100"
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                    className="mb-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        theme === "night" ? "bg-primary/20" : "bg-blue-100"
                      }`}
                    >
                      <Icon className="text-xl text-primary" />
                    </div>
                  </motion.div>
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <p className="font-medium text-primary mb-1">
                    {info.content}
                  </p>
                  <p className="text-sm opacity-70">{info.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              ref={formRef}
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Send us a Message
                </h2>
                <p className="opacity-75">
                  Fill out the form below and we'll get back to you as soon as
                  possible. We appreciate your patience and feedback.
                </p>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mb-6 p-4 rounded-lg bg-success/20 border border-success flex items-center gap-3"
                >
                  <FiCheckCircle className="text-success text-xl" />
                  <div>
                    <p className="font-semibold text-success">
                      Message Sent Successfully!
                    </p>
                    <p className="text-sm opacity-80">
                      Thank you for reaching out. We'll be in touch soon.
                    </p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <MyLabel htmlFor="name">Full Name</MyLabel>
                  <MyInput
                    type="text"
                    placeholder="John Doe"
                    {...register("name", {
                      required: "Name is required",
                    })}
                  />

                  {errors.name && (
                    <span className="text-error text-sm mt-1">
                      {errors.name.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <MyLabel htmlFor="email">Email</MyLabel>
                  <MyInput
                    type="email"
                    placeholder="john@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-error text-sm mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <MyLabel htmlFor="phone">Phone (Optional)</MyLabel>
                  <MyInput
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    required={false}
                    {...register("phone")}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  viewport={{ once: true }}
                >
                  <MyLabel htmlFor="subject">Subject</MyLabel>
                  <MyInput
                    type="text"
                    placeholder="How can we help?"
                    {...register("subject", {
                      required: "Subject is required",
                    })}
                  />
                  {errors.subject && (
                    <span className="text-error text-sm mt-1">
                      {errors.subject.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <MyLabel htmlFor="message" className="label-text font-medium">
                    Message
                  </MyLabel>
                  <textarea
                    placeholder="Tell us your thoughts, concerns, or feedback..."
                    rows="5"
                    className="textarea"
                    {...register("message", {
                      required: "Message is required",
                    })}
                  />
                  {errors.message && (
                    <span className="text-error text-sm mt-1">
                      {errors.message.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{ once: true }}
                >
                  <MyButton
                    type="submit"
                    disabled={loading}
                    className="btn-block"
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="text-lg" />
                        Send Message
                      </>
                    )}
                  </MyButton>
                </motion.div>
              </form>
            </motion.div>

            {/* Illustration Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div
                className={`w-full aspect-square rounded-2xl overflow-hidden ${
                  theme === "night"
                    ? "bg-base-800 border border-base-700"
                    : "bg-linear-to-br from-blue-100 to-purple-100 border border-gray-200"
                }`}
              >
                <img
                  src={contactImage}
                  alt="Contact us illustration"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </MyContainer>
      </section>

      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className={`py-16 md:py-20 ${
          theme === "night" ? "bg-base-800" : "bg-gray-50"
        }`}
      >
        <MyContainer>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="opacity-75 max-w-2xl mx-auto">
              Find quick answers to common questions below
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {faqData.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className="collapse collapse-plus bg-base-100 border border-base-300"
              >
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title text-lg font-semibold flex items-center gap-2">
                  <span>{faq.question}</span>
                </div>
                <div className="collapse-content">
                  <p className="opacity-75">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MyContainer>
      </motion.section>
    </>
  );
};

export default ContactUs;
