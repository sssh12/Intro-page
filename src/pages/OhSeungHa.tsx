import { motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaUser,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import {
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiRedux,
  SiReacthookform,
  SiZod,
  SiReactquery,
  SiStyledcomponents,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

export function ScrollLinked() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const { scrollYProgress } = useScroll({ container: containerRef });

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      let minDiff = Infinity;
      let target = 0;
      let currentIdx = 0;
      sectionRefs.forEach((ref, idx) => {
        if (ref.current) {
          const offset = ref.current.offsetTop;
          const diff = Math.abs(scrollTop - offset);
          if (diff < minDiff) {
            minDiff = diff;
            target = offset;
            currentIdx = idx;
          }
        }
      });

      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const threshold = container.clientHeight / 3;

        const lastSection = sectionRefs[sectionRefs.length - 1].current;
        if (lastSection) {
          const lastSectionBottom =
            lastSection.offsetTop + lastSection.offsetHeight;
          const containerBottom = scrollTop + container.clientHeight;
          if (
            containerBottom >
            lastSectionBottom - container.clientHeight * 0.2
          ) {
            setActiveIdx(currentIdx);
            return;
          }
        }

        if (currentIdx !== sectionRefs.length - 1 && minDiff < threshold) {
          container.scrollTo({ top: target, behavior: "smooth" });
          setActiveIdx(currentIdx);
        } else {
          setActiveIdx(currentIdx);
        }
      }, 120);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [sectionRefs]);

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          originX: 0,
          background: "#e50914",
          zIndex: 50,
          borderRadius: 3,
          mixBlendMode: "normal",
        }}
      />
      <SectionNavBar sectionRefs={sectionRefs} activeIdx={activeIdx} />
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto bg-gradient-to-b from-[#23272f] via-[#18181c] to-[#23272f] text-[#e5e5e5]"
        style={{ scrollBehavior: "smooth" }}
      >
        <OhSeungHa sectionRefs={sectionRefs} />
      </div>
    </>
  );
}

function SectionNavBar({
  sectionRefs,
  activeIdx,
}: {
  sectionRefs: React.RefObject<HTMLDivElement | null>[];
  activeIdx: number;
}) {
  // labels
  const labels = [
    "Intro",
    "About Me",
    "Education",
    "Skills",
    "Projects",
    "Contact",
  ];

  const handleClick = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    sectionRefs[idx].current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    e.currentTarget.blur();
  };

  return (
    <nav
      className="fixed top-1/2 left-6 -translate-y-1/2 z-50 flex flex-col gap-6 bg-[#181818]/80 rounded-2xl px-3 py-6 shadow-2xl border border-[#333] 
      hidden sm:flex"
    >
      {labels.map((label, idx) => (
        <button
          key={label}
          onClick={(e) => handleClick(idx, e)}
          className="group flex flex-col items-center focus:outline-none cursor-pointer"
        >
          <span
            className={`w-3 h-3 rounded-full mb-1 transition-all
              ${
                activeIdx === idx
                  ? "bg-[#e50914] scale-125 shadow-lg"
                  : "bg-[#444]"
              }
              group-hover:bg-[#e50914] group-focus:bg-[#e50914]`}
          />
          <span
            className={`text-xs font-bold tracking-wide transition
            ${activeIdx === idx ? "text-[#e50914]" : "text-gray-400"}
            group-hover:text-[#e50914] group-focus:text-[#e50914]`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}

function OhSeungHa({
  sectionRefs,
}: {
  sectionRefs: React.RefObject<HTMLDivElement | null>[];
}) {
  const projects = [
    {
      id: 1,
      title: "포트폴리오 웹사이트",
      description: "본인을 소개하는 포트폴리오 사이트", // 직접 입력
      stacks: [
        { name: "React", icon: <FaReact size={24} color="#61DAFB" /> },
        {
          name: "TypeScript",
          icon: <SiTypescript size={24} color="#3178c6" />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss size={24} color="#38bdf8" />,
        },
        { name: "Framer Motion", icon: <SiFramer size={24} color="#e50914" /> },
      ],
      detail:
        "React + TypeScript + Tailwind CSS와 Framer Motion으로 구현한 스크롤 애니메이션 프론트엔드 포트폴리오 사이트", // 직접 입력
      image: "./src/assets/images/portfolio.png",
    },
    {
      id: 2,
      title: "개인 블로그 사이트",
      description: "하루하루 공부한 걸 올리는 블로그",
      stacks: [
        { name: "HTML", icon: <SiHtml5 size={24} color="#E34F26" /> },
        { name: "CSS", icon: <SiCss3 size={24} color="#1572B6" /> },
        {
          name: "JavaScript",
          icon: <SiJavascript size={24} color="#F7DF1E" />,
        },
        { name: "Node.js", icon: <FaNodeJs size={24} color="#68a063" /> },
        { name: "Express", icon: <SiExpress size={24} color="#fff" /> },
        { name: "MongoDB", icon: <SiMongodb size={24} color="#47A248" /> },
      ],
      detail:
        "ejs view 모듈들을 연결하고 express와 mongodb로 구현한 기술 공부 블로그",
      image: "./src/assets/images/blog.png",
    },
    {
      id: 3,
      title: "트위터 클론 커뮤니티",
      description: "트위터를 클론해본 사이트",
      stacks: [
        { name: "React", icon: <FaReact size={24} color="#61DAFB" /> },
        {
          name: "Styled Components",
          icon: <SiStyledcomponents size={24} color="#db7093" />,
        },
        { name: "Firebase", icon: <SiFirebase size={24} color="#FFCA28" /> },
      ],
      detail:
        "React + Styled Components로 트위터 UI 디자인을 클론하고 Firebase를 이용해 게시글 및 코멘트 CRUD와 개인 프로필을 구현해본 사이트",
      image: "./src/assets/images/cloneTwitter.png",
    },
    {
      id: 4,
      title: "CollWeb",
      description: "팀 일정 관리 웹 앱",
      stacks: [
        { name: "HTML", icon: <SiHtml5 size={24} color="#E34F26" /> },
        { name: "CSS", icon: <SiCss3 size={24} color="#1572B6" /> },
        {
          name: "JavaScript",
          icon: <SiJavascript size={24} color="#F7DF1E" />,
        },
        {
          name: "SortableJS",
          icon: (
            <span className="text-lg font-bold text-[#4A90E2]">SortableJS</span>
          ),
        },
        { name: "Firebase", icon: <SiFirebase size={24} color="#FFCA28" /> },
      ],
      detail:
        "JavaScript로 SPA 웹을 구현해본 프로젝트이며 SortableJS 라이브러리를 활용해 드래그 앤 드롭 이벤트를 구현해본 일정 관리 웹",
      image: "./src/assets/images/collweb.png",
    },
    {
      id: 5,
      title: "LUVWU",
      description: "커뮤니티 사이트",
      stacks: [
        { name: "React", icon: <FaReact size={24} color="#61DAFB" /> },
        {
          name: "TypeScript",
          icon: <SiTypescript size={24} color="#3178c6" />,
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss size={24} color="#38bdf8" />,
        },
        { name: "Firebase", icon: <SiFirebase size={24} color="#FFCA28" /> },
      ],
      detail:
        "React + TypeScript + Tailwind CSS와 Firebase를 활용해 구현한 게시판 자유 생성 커뮤니티 사이트 게시판, 게시글, 댓글 CRUD를 모두 구현해보았음",
      image: "./src/assets/images/luvwu.png",
    },
    {
      id: 6,
      title: "ToDo",
      description: "바닐라 투두 리스트",
      stacks: [
        { name: "HTML", icon: <SiHtml5 size={24} color="#E34F26" /> },
        { name: "CSS", icon: <SiCss3 size={24} color="#1572B6" /> },
        {
          name: "JavaScript",
          icon: <SiJavascript size={24} color="#F7DF1E" />,
        },
      ],
      detail: "html + css + javascript로만 구현해본 투두 리스트 사이트",
      image: "./src/assets/images/todo.png",
    },
  ];

  const skills = {
    language: [
      { name: "JavaScript", icon: <SiJavascript size={40} color="#F7DF1E" /> },
      { name: "TypeScript", icon: <SiTypescript size={40} color="#3178c6" /> },
      { name: "Python", icon: <FaPython size={40} color="#3776AB" /> },
      {
        name: "C",
        icon: <span className="text-3xl font-bold text-blue-400">C</span>,
      },
      {
        name: "C++",
        icon: <span className="text-3xl font-bold text-blue-300">C++</span>,
      },
    ],
    frontend: [
      { name: "React", icon: <FaReact size={40} color="#61DAFB" /> },
      {
        name: "React Hook Form",
        icon: <SiReacthookform size={40} color="#ec5990" />,
      },
      { name: "Zod", icon: <SiZod size={40} color="#3b82f6" /> },
      { name: "Framer Motion", icon: <SiFramer size={40} color="#e50914" /> },
      { name: "Redux Toolkit", icon: <SiRedux size={40} color="#764abc" /> },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss size={40} color="#38bdf8" />,
      },
      { name: "React Query", icon: <SiReactquery size={40} color="#ff4154" /> },
      {
        name: "Styled Components",
        icon: <SiStyledcomponents size={40} color="#db7093" />,
      },
    ],
    backend: [
      { name: "Node.js", icon: <FaNodeJs size={40} color="#68a063" /> },
      { name: "Express", icon: <SiExpress size={40} color="#fff" /> },
      { name: "MongoDB", icon: <SiMongodb size={40} color="#47A248" /> },
      { name: "Firebase", icon: <SiFirebase size={40} color="#FFCA28" /> },
    ],
    tools: [
      { name: "Git", icon: <SiGit size={40} color="#f34f29" /> },
      { name: "GitHub", icon: <SiGithub size={40} color="#fff" /> },
    ],
  };

  const aboutMe = [
    {
      label: "이름",
      value: "오승하",
      icon: <FaUser className="text-[#e50914] mr-2" size={20} />,
    },
    {
      label: "생년월일",
      value: "2000. 03. 11",
      icon: <FaBirthdayCake className="text-[#e50914] mr-2" size={20} />,
    },
    {
      label: "위치",
      value: "대전광역시 동구",
      icon: <FaMapMarkerAlt className="text-[#e50914] mr-2" size={20} />,
    },
    {
      label: "연락처",
      value: "010-8343-7705",
      icon: <FaPhoneAlt className="text-[#e50914] mr-2" size={20} />,
    },
    {
      label: "이메일",
      value: "ssh0311b@naver.com",
      icon: <FaEnvelope className="text-[#e50914] mr-2" size={20} />,
    },
  ];

  const [projectIdx, setProjectIdx] = useState(0);

  return (
    <div className="bg-transparent text-white">
      {/* 인트로 섹션 */}
      <motion.div
        ref={sectionRefs[0]}
        className="min-h-screen flex flex-col items-center justify-center w-full px-4 py-32 bg-transparent"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src="./src/assets/images/오승하.png"
          alt="오승하"
          className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-[#e50914] shadow-xl bg-[#181818] mb-8"
        />
        <h1 className="text-[2.8rem] md:text-[4rem] font-extrabold text-white mb-6 tracking-tight drop-shadow-lg text-center">
          오승하
        </h1>
        <p className="text-lg md:text-2xl text-[#e5e5e5] text-center mb-2 max-w-2xl">
          안녕하세요! 저는 프론트엔드 개발자입니다.
          <br />
          사용자 경험을 최우선으로 생각하며, 직관적이고 아름다운 UI를 설계하는
          데 열정을 가지고 있습니다.
        </p>
      </motion.div>

      {/* About Me 섹션 */}
      <motion.div
        ref={sectionRefs[1]}
        className="flex flex-col items-center justify-center w-full px-4 py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-[#e50914]">About Me</h2>
        <div className="bg-[#181818]/90 rounded-2xl shadow-xl border border-[#333] p-8 max-w-xl w-full">
          <ul className="flex flex-col gap-5">
            {aboutMe.map((item) => (
              <li key={item.label} className="flex items-center text-lg">
                {item.icon}
                <span className="font-semibold w-24 inline-block">
                  {item.label}
                </span>
                <span className="ml-2 text-gray-200">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Education 섹션 추가 */}
      <motion.div
        ref={sectionRefs[2]}
        className="flex flex-col items-center justify-center w-full px-4 py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-[#ff4b4b]">Education</h2>
        <div className="relative max-w-xl w-full">
          {/* 세로선 */}
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-[#e50914]/40 rounded-full" />
          <ul className="flex flex-col gap-12 pl-16">
            <li className="relative">
              <span className="absolute -left-7 top-1 w-5 h-5 rounded-full bg-[#e50914] border-4 border-white shadow" />
              <div className="bg-[#181818]/90 rounded-xl shadow border border-[#333] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-lg font-semibold text-white">
                    우송정보대학교 컴퓨터정보학과
                  </span>
                  <span className="text-gray-400 text-sm mt-2 sm:mt-0">
                    2021 ~ 2023
                  </span>
                </div>
                <span className="text-[#ff4b4b] font-bold mt-2 block">
                  졸업
                </span>
              </div>
            </li>
            <li className="relative">
              <span className="absolute -left-7 top-1 w-5 h-5 rounded-full bg-[#e50914] border-4 border-white shadow" />
              <div className="bg-[#181818]/90 rounded-xl shadow border border-[#333] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-lg font-semibold text-white">
                    우송대학교 컴퓨터 소프트웨어 전공
                  </span>
                  <span className="text-gray-400 text-sm mt-2 sm:mt-0">
                    2025 ~
                  </span>
                </div>
                <span className="text-[#e50914] font-bold mt-2 block">
                  재학 중
                </span>
              </div>
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Skills 섹션 */}
      <motion.div
        ref={sectionRefs[3]}
        className="flex flex-col items-center justify-center w-full px-4 py-32"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 tracking-tight text-[#e50914] drop-shadow-lg">
          Skills
        </h2>
        <p className="mb-5">이런 기술들을 다룰 줄 알아요!</p>
        <div className="flex flex-col gap-10 bg-[#181818]/80 border border-[#333] p-6 rounded-lg shadow-lg w-full max-w-3xl">
          {/* Language */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#e50914]">Language</h3>
            <div className="flex flex-wrap gap-8">
              {skills.language.map((skill, i) => (
                <div
                  key={i}
                  className="relative group flex flex-col items-center cursor-pointer"
                >
                  <div className="bg-[#222] rounded-full p-4 shadow-lg border-b-4 border-[#e50914] group-hover:bg-[#e50914] transition">
                    {skill.icon}
                  </div>
                  <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black/90 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 shadow-lg border border-[#333]">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Frontend */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#e50914]">Frontend</h3>
            <div className="flex flex-wrap gap-8">
              {skills.frontend.map((skill, i) => (
                <div
                  key={i}
                  className="relative group flex flex-col items-center cursor-pointer"
                >
                  <div className="bg-[#222] rounded-full p-4 shadow-lg border-b-4 border-[#e50914] group-hover:bg-[#e50914] transition">
                    {skill.icon}
                  </div>
                  <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black/90 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 shadow-lg border border-[#333]">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Backend */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#e50914]">Backend</h3>
            <div className="flex flex-wrap gap-8">
              {skills.backend.map((skill, i) => (
                <div
                  key={i}
                  className="relative group flex flex-col items-center cursor-pointer"
                >
                  <div className="bg-[#222] rounded-full p-4 shadow-lg border-b-4 border-[#e50914] group-hover:bg-[#e50914] transition">
                    {skill.icon}
                  </div>
                  <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black/90 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 shadow-lg border border-[#333]">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Tools */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#e50914]">Tools</h3>
            <div className="flex flex-wrap gap-8">
              {skills.tools.map((skill, i) => (
                <div
                  key={i}
                  className="relative group flex flex-col items-center cursor-pointer"
                >
                  <div className="bg-[#222] rounded-full p-4 shadow-lg border-b-4 border-[#e50914] group-hover:bg-[#e50914] transition">
                    {skill.icon}
                  </div>
                  <span className="absolute bottom-[-2.5rem] left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black/90 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 shadow-lg border border-[#333]">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 프로젝트 섹션 (클릭 슬라이드) */}
      <motion.div
        ref={sectionRefs[4]}
        className="min-h-screen flex flex-col items-center justify-center px-4"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 tracking-tight text-[#e50914] drop-shadow-lg ml-4">
          Projects
        </h2>
        <div className="relative flex flex-col items-center w-full max-w-2xl">
          {/* 좌우 버튼 */}
          <button
            className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-[#222] rounded-full p-2 shadow hover:bg-[#e50914] transition z-10"
            onClick={() => setProjectIdx((prev) => Math.max(prev - 1, 0))}
            disabled={projectIdx === 0}
            aria-label="이전 프로젝트"
          >
            ◀
          </button>
          <button
            className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-[#222] rounded-full p-2 shadow hover:bg-[#e50914] transition z-10"
            onClick={() =>
              setProjectIdx((prev) => Math.min(prev + 1, projects.length - 1))
            }
            disabled={projectIdx === projects.length - 1}
            aria-label="다음 프로젝트"
          >
            ▶
          </button>
          {/* 카드 슬라이드 */}
          <div
            className="w-full flex justify-center items-center overflow-visible"
            style={{ minHeight: 340 }}
          >
            {projects.map(
              (project, i) =>
                i === projectIdx && (
                  <motion.div
                    key={project.id}
                    className="bg-[#181818] rounded-xl p-8 shadow-xl transition-all duration-300 scale-105 z-10"
                    style={{
                      minWidth: 340,
                      maxWidth: 420,
                    }}
                    whileHover={{
                      scale: 1.32,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-44 object-cover rounded-lg mb-4 border border-[#333]"
                    />
                    <div className="flex gap-2 mb-2">
                      {project.stacks.map((stack, idx) => (
                        <div
                          key={idx}
                          className="relative group flex items-center"
                        >
                          <span
                            className="bg-[#222] rounded-full p-2 transition group-hover:bg-[#e50914] group-hover:scale-110 group-hover:shadow-lg"
                            style={{ display: "inline-flex" }}
                          >
                            {stack.icon}
                          </span>
                          {/* 툴팁 */}
                          <span
                            className="absolute left-1/2 -translate-x-1/2 top-10 px-2 py-1 rounded bg-black/90 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 shadow-lg border border-[#333]"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            {stack.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-[#e50914]">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-2">{project.description}</p>
                    <p className="text-gray-400 text-sm">{project.detail}</p>
                  </motion.div>
                )
            )}
          </div>
          {/* 인디케이터 */}
          <div className="flex gap-2 mt-6">
            {projects.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === projectIdx ? "bg-[#e50914]" : "bg-[#444]"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact 섹션 */}
      <section
        ref={sectionRefs[5]}
        className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-32 bg-transparent relative"
        style={{ minHeight: "100vh" }}
      >
        <h2 className="text-3xl font-bold mb-8 text-[#e50914]">Contact</h2>
        <div className="flex gap-6 mb-6 justify-center">
          <a
            href="https://instagram.com/rjtwgsg"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-400 text-white rounded-full p-4 shadow-lg hover:scale-110 transition"
            aria-label="Instagram"
          >
            {/* 인스타그램 아이콘 */}
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
            </svg>
          </a>
          <a
            href="https://github.com/sssh12"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#222] text-white rounded-full p-4 shadow-lg hover:bg-[#e50914] hover:scale-110 transition"
            aria-label="GitHub"
          >
            {/* 깃허브 아이콘 */}
            <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.578.688.48C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
            </svg>
          </a>
        </div>
      </section>

      <footer className="w-full py-4 text-center bg-[#272727] text-gray-200 border-t border-white/10 text-sm mt-0">
        © {new Date().getFullYear()} Oh Seung Ha. All rights reserved.
      </footer>
    </div>
  );
}

export default ScrollLinked;
