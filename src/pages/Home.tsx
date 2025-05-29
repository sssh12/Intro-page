import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const profiles = [
  {
    id: 1,
    name: "오승하",
    image: "/Intro-page/assets/images/오승하.png",
    path: "/profile/1",
  },
  {
    id: 2,
    name: "박수빈",
    image: "/Intro-page/assets/images/박수빈.png",
    path: "/profile/2",
  },
  {
    id: 3,
    name: "문재웅",
    image: "/Intro-page/assets/images/문재웅.png",
    path: "/profile/3",
  },
];

export default function ProfileSelection() {
  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.4 }}
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 -z-10 bg-[url('/Intro-page/assets/images/backGround.png')]" />
      {/* 블러 오버레이 */}
      <div className="absolute inset-0 -z-10 backdrop-blur-sm bg-black/50" />
      <h1 className="text-4xl font-bold mb-8">프로필 선택</h1>
      <p className="text-lg text-gray-500 mb-4">원하는 프로필을 선택하세요.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {profiles.map((profile) => (
          <Link
            to={profile.path}
            key={profile.id}
            className="flex flex-col items-center group"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-white transition-transform group-hover:scale-110 active:scale-95">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-4 text-xl font-medium group-hover:text-gray-300 transition">
              {profile.name}
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
