// src/pages/Dashboard/EditProfilePage.jsx
import { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineUser,
  HiOutlineLink,
} from "react-icons/hi";
import useAuthInfo from "../../../hooks/useAuthInfo";
import MyContainer from "../../../components/shared/MyContainer/MyContainer";
import Avatar from "../../../components/shared/Avatar/Avatar";
import MyButton from "../../../components/ui/MyButton/MyButton";
import ActionSpinner from "../../../components/ui/ActionSpinner/ActionSpinner";
import MyLabel from "../../../components/ui/MyLabel/MyLabel";
import MyInput from "../../../components/ui/MyInput/MyInput";
import MyTitle from "../../../components/ui/MyTitle/MyTitle";

const EditProfile = () => {
  const { currentUser, updateUserProfile, loading } = useAuthInfo();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

  // GSAP stagger animation on mount
  useEffect(() => {
    gsap.fromTo(
      containerRef.current.querySelectorAll(".stagger-item"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const handleSave = async () => {
    if (!displayName.trim()) {
      toast.error("Display name cannot be empty");
      return;
    }

    setSaving(true);
    try {
      await updateUserProfile({
        displayName: displayName.trim(),
        photoURL: photoURL.trim() || null, // allow clearing the photo URL
      });

      toast.success("Profile updated successfully!");
      navigate("/dashboard/profile");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <motion.section
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen py-8"
    >
      <MyContainer>
        <div ref={containerRef} className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="stagger-item text-center mb-8">
            <MyTitle>Edit Profile</MyTitle>
          </div>

          {/* Form Card */}
          <div className="stagger-item card bg-base-100 dark:bg-gray-800 shadow-xl border border-base-300 dark:border-gray-700">
            <div className="card-body">
              {/* Avatar Preview */}
              <div className="flex flex-col items-center mb-8">
                <Avatar
                  src={photoURL || currentUser?.photoURL}
                  alt={displayName || "User"}
                  size="size-32"
                />
                <p className="mt-4 text-sm text-base-content/60 dark:text-gray-400">
                  Profile picture preview
                </p>
              </div>

              {/* Display Name */}
              <div className="form-control stagger-item">
                <MyLabel>
                  <HiOutlineUser className="size-5" />
                  Display Name
                </MyLabel>
                <MyInput
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                  disabled={saving || loading}
                />
              </div>

              {/* Photo URL */}
              <div className="form-control stagger-item mt-6">
                <MyLabel>
                  <HiOutlineLink className="size-5" />
                  Profile Picture URL
                </MyLabel>
                <MyInput
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  disabled={saving || loading}
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60 text-wrap">
                    Enter a direct link to an image (e.g. from Imgur, Unsplash,
                    etc.)
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="card-actions flex justify-end gap-3 mt-10 stagger-item">
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="btn btn-sm md:btn-md btn-ghost gap-2"
                  disabled={saving || loading}
                >
                  <HiOutlineX className="size-5" />
                  Cancel
                </button>
                <MyButton onClick={handleSave} disabled={saving || loading}>
                  {saving ? (
                    <ActionSpinner />
                  ) : (
                    <HiOutlineCheck className="size-5" />
                  )}
                  Save Changes
                </MyButton>
              </div>
            </div>
          </div>
        </div>
      </MyContainer>
    </motion.section>
  );
};

export default EditProfile;
