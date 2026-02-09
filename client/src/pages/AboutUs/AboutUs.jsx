import MyContainer from "../../components/shared/MyContainer/MyContainer";
import MyTitle from "../../components/ui/MyTitle/MyTitle";
import MyButton from "../../components/ui/MyButton/MyButton";
import CountUpNumber from "../../components/ui/CountUpNumber/CountUpNumber";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { teamMembers } from "../../data/teamMembers";
import { features } from "../../data/features";
import { values } from "../../data/values";
import { stats } from "../../data/stats";
import { useNavigate } from "react-router";

const AboutUs = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <title>About Us | Nexira</title>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 py-16 md:py-20 overflow-hidden">
        <MyContainer>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <MyTitle>About Nexira</MyTitle>
            <p className="text-neutral dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Empowering professionals and businesses to build meaningful
              connections through skill-based work opportunities
            </p>
          </motion.div>
        </MyContainer>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-base-100 dark:bg-base-200">
        <MyContainer>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="text-center p-4 md:p-6 rounded-lg bg-base-200 dark:bg-base-300 hover:shadow-lg transition-shadow"
              >
                <p className="text-2xl md:text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <CountUpNumber
                    target={stat.number}
                    duration={2500}
                    suffix={stat.suffix || ""}
                  />
                </p>
                <p className="text-sm md:text-base text-neutral dark:text-gray-400 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </MyContainer>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-12 md:py-16 bg-base-100 dark:bg-base-100">
        <MyContainer>
          <div className="mb-12">
            <MyTitle>Our Values</MyTitle>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.id}
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-base-200 dark:bg-base-300 hover:shadow-xl transition-all duration-300 border border-base-300 dark:border-base-400 hover:border-secondary/30"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/20 dark:bg-primary/30">
                      <Icon className="text-2xl text-primary dark:text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral dark:text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-neutral dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </MyContainer>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-linear-to-br from-base-200 to-base-300 dark:from-base-200 dark:to-base-300">
        <MyContainer>
          <div className="mb-12">
            <MyTitle>Why Choose Us</MyTitle>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-secondary/20 dark:bg-secondary/30">
                      <Icon className="text-4xl text-secondary dark:text-secondary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-neutral dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-neutral dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </MyContainer>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 bg-base-100 dark:bg-base-100">
        <MyContainer>
          <div className="mb-12">
            <MyTitle>Our Team</MyTitle>
            <p className="text-center text-neutral dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Meet the talented people behind Nexira
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-400"
              >
                <div className="relative h-48 overflow-hidden bg-linear-to-br from-primary/20 to-secondary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h4 className="text-lg font-bold text-neutral dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-sm text-secondary dark:text-secondary mt-1">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </MyContainer>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-16 bg-linear-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 border-t border-base-300 dark:border-base-400 overflow-hidden">
        <MyContainer>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral dark:text-white">
              Ready to Find Your Next Opportunity?
            </h2>
            <p className="text-neutral dark:text-gray-300 text-base md:text-lg">
              Join thousands of professionals and employers building successful
              careers and businesses on Nexira
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <MyButton onClick={() => navigate("/all-jobs")}>
                Browse Jobs
              </MyButton>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate("/dashboard/add-job")}
                className="btn btn-sm md:btn-md btn-outline text-primary dark:text-secondary border-primary dark:border-secondary hover:bg-primary/10 dark:hover:bg-secondary/10"
              >
                Post a Job
              </motion.button>
            </div>
          </motion.div>
        </MyContainer>
      </section>
    </>
  );
};

export default AboutUs;
