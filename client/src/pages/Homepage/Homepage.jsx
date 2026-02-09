import { useEffect, useState } from "react";
import JobCard from "../../components/shared/JobCard/JobCard";
import MyTitle from "../../components/ui/MyTitle/MyTitle";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyContainer from "../../components/shared/MyContainer/MyContainer";
import useCategoryData from "../../hooks/useCategoryData";
import useFeaturesData from "../../hooks/useFeaturesData";
import BannerSlider from "../../components/ui/BannerSlider/BannerSlider";
import Badge from "../../components/ui/Badge/Badge";
import FetchSpinner from "../../components/ui/FetchSpinner/FetchSpinner";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";
import MyButton from "../../components/ui/MyButton/MyButton";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import MyInput from "../../components/ui/MyInput/MyInput";
import { howItWorksData } from "../../data/howItWorksData";
import {
  HiOutlineUserPlus,
  HiOutlineMagnifyingGlassCircle,
  HiOutlineShieldCheck,
  HiOutlineCurrencyDollar,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBriefcase,
} from "react-icons/hi2";
import { testimonialsData } from "../../data/testimonialsData";
import { HiStar } from "react-icons/hi";
import { careerResourcesData } from "../../data/careerResourcesData";
import { topFreelancersData } from "../../data/topFreelancersData";

const Homepage = () => {
  const navigate = useNavigate();
  const publicAxios = usePublicAxios();
  const [loading, setLoading] = useState(true);
  const [latestJobs, setLatestJobs] = useState([]);
  const categories = useCategoryData();
  const featuresData = useFeaturesData();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data } = await publicAxios.get("/jobs", {
          params: {
            excludes: "creator_email,created_at,status",
            sortBy: "created_at",
            sortOrder: "desc",
            limit: 6,
          },
        });

        if (data.success) {
          setLatestJobs(data.jobs);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [publicAxios]);

  const jobCardElements = latestJobs.map((item) => (
    <JobCard key={item._id} singleJob={item} />
  ));

  return (
    <>
      <title>Home - Nexira</title>

      {/* Hero Banner */}
      <motion.section
        className="mt-5"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
      >
        <MyContainer>
          <BannerSlider />
        </MyContainer>
      </motion.section>

      {/* Latest Jobs */}
      <section className="bg-secondary/3 py-10">
        <MyContainer className="space-y-16 md:space-y-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-3.5"
          >
            <MyTitle>
              <span className="primary_linear bg-clip-text text-transparent">
                Latest Jobs
              </span>{" "}
              for You
            </MyTitle>

            <p className="text-base md:text-lg max-w-xl mx-auto">
              Discover fresh opportunities tailored to your skills and
              interests. Stay ahead with curated job listings that match your
              goals and career aspirations
            </p>
          </motion.div>

          {loading ? (
            <FetchSpinner className="min-h-[30dvh]" />
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7">
              {jobCardElements}
            </div>
          )}

          <div className="flex items-center justify-center">
            <MyButton onClick={() => navigate("/all-jobs")}>
              Explore All Jobs
            </MyButton>
          </div>
        </MyContainer>
      </section>

      {/* Categories */}
      <section>
        <MyContainer className="space-y-14">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            className="text-center space-y-3.5"
          >
            <MyTitle>
              <span className="primary_linear bg-clip-text text-transparent">
                Popular
              </span>{" "}
              Categories
            </MyTitle>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Discover thousands of opportunities across our most popular
              freelance categories
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
            {categories.map((category) => (
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                key={category.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl duration-300  group dark:border-2 border-white/20 dark:shadow-white/15"
              >
                <figure className="relative h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                  <div className="absolute bottom-4 left-4">
                    <Badge className={`${category.color} badge-lg`}>
                      {category.icon}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <Badge>{category.jobs} jobs</Badge>
                  </div>
                </figure>

                <div className="card-body">
                  <h3 className="card-title text-lg font-bold text-neutral">
                    {category.name}
                  </h3>
                  <p>{category.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Opportunity */}
      <section className="mt-6 py-8 bg-info/4 dark:bg-info/20">
        <MyContainer className="space-y-9">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.4,
              type: "spring",
              bounce: 0.5,
            }}
            className="text-center space-y-3.5"
          >
            <MyTitle>
              Where{" "}
              <span className="primary_linear bg-clip-text text-transparent">
                Talent
              </span>{" "}
              Meets{" "}
              <span className="primary_linear bg-clip-text text-transparent">
                Opportunity
              </span>
            </MyTitle>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Nexira is where world-class talent meets opportunity. We're
              building the future of work by connecting exceptional freelancers
              with businesses that need their skills. Whether you're looking to
              hire or get hired, Nexira makes it simple, secure, and successful.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-xl sm:text-2xl text-neutral font-bold">
                Revolutionizing How The World Works
              </h3>
              <div className="space-y-2.5">
                <p>
                  Founded on the principle that great work knows no boundaries,
                  Nexira breaks down geographical barriers to bring you the best
                  talent from every corner of the globe.
                </p>
                <p>
                  Our intelligent matching system ensures you find the perfect
                  freelancer for your project needs, while our secure platform
                  protects both clients and talent throughout the entire
                  process.
                </p>
                <p>
                  From startups to Fortune 500 companies, thousands of
                  businesses trust Nexira to scale their teams and bring their
                  ideas to life.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuresData.map((feature) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  key={feature.id}
                  className="card bg-base-200 shadow-sm dark:shadow-white/30 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="card-body">
                    <div className="text-primary mb-3">{feature.icon}</div>
                    <h4 className="card-title text-lg font-semibold">
                      {feature.title}
                    </h4>
                    <p>{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </MyContainer>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <MyContainer className="space-y-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <MyTitle>
              How{" "}
              <span className="primary_linear bg-clip-text text-transparent">
                Nexira
              </span>{" "}
              Works
            </MyTitle>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Get started in just a few simple steps. Whether you're hiring top
              talent or looking for your next project, Nexira makes it easy and
              secure.
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorksData.map((item, index) => {
              const IconComponent = {
                userPlus: HiOutlineUserPlus,
                search: HiOutlineMagnifyingGlassCircle,
                shield: HiOutlineShieldCheck,
              }[item.iconType];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative card bg-base-100 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-base-300 dark:border-gray-700"
                >
                  <div className="card-body text-center space-y-6 p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-${item.color}/10 text-${item.color} flex items-center justify-center mx-auto`}
                    >
                      <IconComponent className="w-9 h-9" />
                    </div>

                    {/* Step Number */}
                    <span className="absolute top-4 right-6 text-6xl font-bold text-primary/5 dark:text-primary/10 select-none">
                      {item.step}
                    </span>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-base-content dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-base-content/70 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Connector Line */}
                  {index < howItWorksData.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-1 bg-primary/20 dark:bg-primary/30 -translate-y-1/2" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <MyButton onClick={() => navigate("/all-jobs")}>
              Get Started Today
            </MyButton>
          </motion.div>
        </MyContainer>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-base-100 dark:bg-gray-900">
        <MyContainer className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <MyTitle>
              Success{" "}
              <span className="primary_linear bg-clip-text text-transparent">
                Stories
              </span>
            </MyTitle>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Real freelancers and clients share how Nexira transformed their
              work and business.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="card bg-base-200 dark:bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-400 border border-base-300 dark:border-gray-700"
              >
                <div className="card-body space-y-5">
                  <div className="flex text-warning">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <HiStar key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-base-content/80 dark:text-gray-200 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-4 border-t border-base-300 dark:border-gray-700">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-base-content/60 dark:text-gray-400">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Career Resources */}
      <section className="py-16">
        <MyContainer className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <MyTitle>
              Career{" "}
              <span className="primary_linear bg-clip-text text-transparent">
                Resources
              </span>
            </MyTitle>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Level up your freelance career with expert guides, templates, and
              tools.
            </p>
          </motion.div>

          {/* Resources Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerResourcesData.map((resource, index) => {
              const IconComponent = {
                currency: HiOutlineCurrencyDollar,
                document: HiOutlineDocumentText,
                chat: HiOutlineChatBubbleLeftRight,
                briefcase: HiOutlineBriefcase,
              }[resource.iconType];

              return (
                <motion.div
                  key={resource.id} // Stable unique key
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer card bg-base-100 dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-400 h-full border border-base-300 dark:border-gray-700"
                  onClick={() => toast.info("Feature is in progress!")}
                >
                  <div className="card-body text-center space-y-4 p-6">
                    {/* Dynamic Icon */}
                    <div
                      className={`mx-auto p-4 rounded-2xl bg-base-200 dark:bg-gray-700 text-${resource.color}`}
                    >
                      <IconComponent className="w-10 h-10" />
                    </div>

                    <h3 className="text-xl font-bold text-base-content dark:text-white">
                      {resource.title}
                    </h3>
                    <p className="text-base-content/70 dark:text-gray-300 text-sm">
                      {resource.description}
                    </p>
                    <span className="text-primary font-medium group-hover:text-primary-focus transition-colors">
                      Learn More →
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </MyContainer>
      </section>

      {/* Top Freelancers */}
      <section className="py-16">
        <MyContainer className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <MyTitle>
              Top{" "}
              <span className="primary_linear bg-clip-text text-transparent">
                Freelancers
              </span>
            </MyTitle>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Meet our highest-rated talent. These professionals consistently
              deliver exceptional work and earn top client trust.
            </p>
          </motion.div>

          {/* Freelancers Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {topFreelancersData.map((freelancer, index) => (
              <motion.div
                key={freelancer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="card bg-base-100 dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 border border-base-300 dark:border-gray-700 h-full">
                  <div className="card-body text-center space-y-5 p-6">
                    {/* Avatar */}
                    <div className="avatar online mx-auto">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                        <img
                          src={freelancer.avatar}
                          alt={freelancer.name}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-base-content dark:text-white">
                        {freelancer.name}
                      </h3>
                      <p className="text-base-content/70 dark:text-gray-300">
                        {freelancer.title}
                      </p>

                      {/* Rating & Jobs */}
                      <div className="flex items-center justify-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <HiStar className="w-5 h-5 text-warning fill-current" />
                          <span className="font-semibold">
                            {freelancer.rating}
                          </span>
                        </div>
                        <span className="text-base-content/50 dark:text-gray-500">
                          {freelancer.jobs} jobs
                        </span>
                      </div>

                      {/* Earnings Badge */}
                      <div className="badge badge-lg badge-primary font-bold">
                        Earned ${freelancer.earnings}
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 justify-center">
                      {freelancer.skills.map((skill) => (
                        <div
                          key={skill}
                          className="badge badge-outline badge-sm text-base-content/70 dark:text-gray-400"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </MyContainer>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 dark:from-primary/20 dark:via-gray-900 dark:to-secondary/20">
        <MyContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            {/* Headline */}
            <div className="space-y-4">
              <MyTitle>
                Stay Ahead with{" "}
                <span className="primary_linear bg-clip-text text-transparent">
                  Nexira Updates
                </span>
              </MyTitle>
              <p className="text-base md:text-lg max-w-xl mx-auto">
                Get the latest job opportunities, freelance tips, platform
                updates, and exclusive insights delivered straight to your
                inbox.
              </p>
            </div>

            {/* Subscribe Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();

                const email = e.target.email.value;
                if (email) {
                  toast.success("Successfully subscribed");
                  e.target.reset();
                }
              }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <MyInput
                type="email"
                name="email"
                placeholder="Enter your email address"
              />

              <MyButton>Subscribe Now</MyButton>
            </form>

            {/* Trust & Privacy Note */}
            <p className="text-sm text-base-content/60 dark:text-gray-400">
              We respect your privacy. Unsubscribe at any time. No spam, ever.
            </p>
          </motion.div>
        </MyContainer>
      </section>
    </>
  );
};

export default Homepage;
