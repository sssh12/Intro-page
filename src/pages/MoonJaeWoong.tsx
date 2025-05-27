import { motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaPython } from "react-icons/fa";
import {
  SiDart,
  SiFlutter,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiAdobepremierepro,
  SiAdobeaftereffects,
} from "react-icons/si";

const skills = [
  { name: "Python", icon: <FaPython size={40} color="#3776AB" /> },
  { name: "Dart", icon: <SiDart size={40} color="#0175C2" /> },
  { name: "HTML", icon: <SiHtml5 size={40} color="#E34F26" /> },
  { name: "CSS", icon: <SiCss3 size={40} color="#1572B6" /> },
  { name: "JavaScript", icon: <SiJavascript size={40} color="#F7DF1E" /> },
  { name: "Flutter", icon: <SiFlutter size={40} color="#02569B" /> },
  {
    name: "Premiere Pro",
    icon: <SiAdobepremierepro size={40} color="#9999FF" />,
  },
  {
    name: "After Effects",
    icon: <SiAdobeaftereffects size={40} color="#9999FF" />,
  },
];

const education = [
  { school: "화홍중학교", period: "2019 ~ 2021", status: "졸업" },
  { school: "화홍고등학교", period: "2022 ~ 2024", status: "졸업" },
  {
    school: "네이버 커넥트재단",
    period: "2024",
    status: "AI 엔지니어 트랙 수료",
  },
  { school: "우송대학교", period: "2025 ~", status: "재학" },
];

const career = [
  "2023 : AI 혁신학교 동아리 창설 및 기장 활동",
  "2023 : 한양대 파이썬 게임 개발 대회 참가",
  "2024 : AI 선도학교 선정 기여",
  "2024 : 네이버 커넥트재단 AI 엔지니어 교육 수료",
  "2024 : Flutter & Python 기반 외주 프로젝트 진행",
];

const projects = [
  {
    title: "BRAINDEAD",
    desc: "한양대 주최 2024 전국 청소년 오픈SW GAME 코딩대회 출품작\nPygame과 PyQt5를 활용해 개발한 2D 슈팅 생존 게임\n다양한 게임 오브젝트와 UI를 직접 구현함",
  },
  {
    title: "일정 관리 앱",
    desc: "Flutter로 개발한 개인용 To-Do 리스트 앱\n다크 모드와 로컬 알림 기능 포함",
  },
  {
    title: "Flutter 기반 투표 시스템",
    desc: "동아리·학생회용 익명 투표 앱\n실시간 통계 시각화 및 사용자 알림 기능 탑재",
  },
  {
    title: "AI 차량 번호판 인식 시스템",
    desc: "Python과 OpenCV, Tesseract OCR을 활용한 차량 번호판 인식기\n번호판 영역 검출 및 문자 인식을 통한 차량 식별 자동화\n실제 차량 영상 기반 테스트 및 정확도 평가 수행",
  },
  {
    title: "QR 출입 기록 앱",
    desc: "Flutter로 제작한 간편 QR 기반 출입 체크 앱\n소규모 행사나 동아리 출입 관리용으로 활용 가능",
  },
  {
    title: "시간표 & 수업 알림 앱",
    desc: "학생들을 위한 Flutter 기반 시간표 및 수업 알림 앱\n사용자가 입력한 주간 시간표 정보를 바탕으로\n수업 시작 전 로컬 푸시 알림 전송",
  },
];

export function ScrollLinkedMoonJaeWoong() {
  const sectionRefs = Array.from({ length: 7 }, () =>
    useRef<HTMLDivElement>(null)
  ) as React.RefObject<HTMLDivElement>[];
  const containerRef = useRef<HTMLDivElement>(null);
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
      {/* 스크롤 인디케이터 */}
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
      {/* 좌측 네비게이션 바 */}
      <SectionNavBar sectionRefs={sectionRefs} activeIdx={activeIdx} />
      {/* 스크롤 컨테이너 */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto bg-gradient-to-b from-[#23272f] via-[#18181c] to-[#23272f] text-[#e5e5e5]"
        style={{ scrollBehavior: "smooth" }}
      >
        <MoonJaeWoong sectionRefs={sectionRefs} />
      </div>
    </>
  );
}

function SectionNavBar({
  sectionRefs,
  activeIdx,
}: {
  sectionRefs: React.RefObject<HTMLDivElement>[];
  activeIdx: number;
}) {
  const labels = [
    "Intro",
    "About Me",
    "Education",
    "Skills & Tools",
    "Career",
    "Projects",
  ];

  const handleClick = (idx: number, e: React.MouseEvent<HTMLButtonElement>) => {
    sectionRefs[idx].current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    e.currentTarget.blur();
  };

  return (
    <nav className="fixed top-1/2 left-6 -translate-y-1/2 z-50 flex flex-col gap-6 bg-[#181818]/80 rounded-2xl px-3 py-6 shadow-2xl border border-[#333]">
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

function MoonJaeWoong({
  sectionRefs,
}: {
  sectionRefs: React.RefObject<HTMLDivElement>[];
}) {
  const [projectIdx, setProjectIdx] = useState(0);

  return (
    <motion.div
      className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-[#23272f] via-[#18181c] to-[#23272f] text-[#e5e5e5]"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      {/* Intro */}
      <motion.section
        ref={sectionRefs[0]}
        className="min-h-screen flex flex-col items-center justify-center w-full px-4 py-32"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center w-full">
          <h1 className="text-[2.8rem] md:text-[4rem] font-extrabold text-white mb-6 tracking-tight drop-shadow-lg text-center">
            플러터 개발자 문재웅입니다
          </h1>
          <p className="text-lg md:text-2xl text-[#e5e5e5] text-center mb-10 max-w-2xl">
            실질적인 가치를 만들어내는 개발자가 되고 싶습니다.
          </p>
          <img
            src="./src/assets/images/문재웅.png"
            alt="문재웅"
            className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-[#e50914] shadow-xl bg-[#181818] mb-2"
          />
        </div>
      </motion.section>
      {/* About */}
      <motion.section
        ref={sectionRefs[1]}
        className="flex flex-col items-center justify-center w-full px-4 py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg w-full max-w-4xl">
          About Me
        </h2>
        <div className="flex flex-col gap-6 max-w-4xl text-lg text-[#e5e5e5] bg-[#181818]/90 rounded-2xl shadow-xl border border-[#333] p-8">
          <p>
            <strong>
              고등학교 2학년 말, 저는 대학 진학을 포기하고 취업을 준비했습니다.
            </strong>
            <br />
            그러나 번아웃이 찾아와 큰 혼란을 겪었고, 고등학교 3학년 담임선생님의
            조언으로 다시 진로를 고민하게 되었습니다.
            <br />
            그렇게 선택한 우송대학교 컴퓨터소프트웨어전공에서 저는 제 길을 찾게
            되었습니다.
          </p>
          <p>
            고등학교 시절, 인공지능 개발 동아리를 직접 만들어 기장으로써
            활동하였고
            <br />
            다양한 프로젝트를 기획하고 친구들과 협업해왔습니다.
            <br />
            특히 한양대학교 파이썬 게임 개발 대회에 팀을 꾸려 참가한 경험은
            <br />
            프로그래밍의 매력을 깊이 느끼게 해준 계기였습니다.
          </p>
          <p>
            제가 속했던 학교는 경기도교육청 AI 혁신학교로 선정된 이후,
            <br />
            저희 동아리의 다양한 활동들이 경기도에서 가장 높은 평가를 받아
            <br />
            <strong>결국 AI 선도학교로 승격되는 성과</strong>를 이루었습니다.
            <br />이 변화에 일조했다는 점은 저에게 큰 자부심으로 남아 있습니다.
          </p>
          <p>
            이후 파이썬뿐만 아니라 Flutter를 공부하기 시작해 여러 개인
            프로젝트를 진행했습니다.
            <br />
            외주를 받아 클라이언트의 요구에 맞춰 프로그램을 제작하는 경험을
            하며,
            <br />
            개발의 실용성과 책임감을 동시에 배울 수 있었습니다.
          </p>
        </div>
      </motion.section>
      {/* Education */}
      <motion.section
        ref={sectionRefs[2]}
        className="flex flex-col items-center justify-center w-full px-4 py-32"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg w-full max-w-4xl">
          Education
        </h2>
        <div className="flex flex-wrap gap-6 max-w-4xl">
          {education.map((edu, i) => (
            <div
              key={i}
              className="bg-[#181818]/90 rounded-xl p-6 w-64 shadow-lg border border-[#333] hover:scale-105 transition"
            >
              <h3 className="text-xl font-semibold mb-2">{edu.school}</h3>
              <p className="text-gray-400">{edu.period}</p>
              <p className="mt-2 font-bold text-[#e50914]">{edu.status}</p>
            </div>
          ))}
        </div>
      </motion.section>
      {/* Skills */}
      <motion.section
        ref={sectionRefs[3]}
        className="flex flex-col items-center justify-center w-full px-4 py-32"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg w-full max-w-4xl">
          Skills & Tools
        </h2>
        <div className="flex flex-wrap gap-8 max-w-4xl">
          {skills.map((skill, i) => (
            <div
              key={i}
              className="relative group flex flex-col items-center justify-center w-20 h-20 bg-[#181818]/90 rounded-xl shadow-lg border border-[#333] hover:scale-110 transition"
            >
              {skill.icon}
              <span className="absolute bottom-[-2.2rem] left-1/2 -translate-x-1/2 px-3 py-1 rounded bg-black/90 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10 shadow-lg border border-[#333]">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </motion.section>
      {/* Career */}
      <motion.section
        ref={sectionRefs[4]}
        className="flex flex-col items-center justify-center w-full px-4 py-32"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg w-full max-w-4xl">
          Career
        </h2>
        <ul className="list-disc pl-8 text-lg text-[#e5e5e5] max-w-4xl">
          {career.map((item, i) => (
            <li key={i} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      </motion.section>
      {/* Projects */}
      <motion.section
        ref={sectionRefs[5]}
        className="flex flex-col items-center justify-center w-full px-4 py-32"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg w-full max-w-4xl">
          Projects
        </h2>
        <div className="relative flex flex-col items-center w-full max-w-2xl">
          {/* 좌우 버튼 */}
          <button
            className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-[#222] rounded-full p-2 shadow hover:bg-[#e50914] hover:text-white transition z-10"
            onClick={() => setProjectIdx((prev) => Math.max(prev - 1, 0))}
            disabled={projectIdx === 0}
            aria-label="이전 프로젝트"
          >
            ◀
          </button>
          <button
            className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-[#222] rounded-full p-2 shadow hover:bg-[#e50914] hover:text-white transition z-10"
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
            {projects.map((project, i) =>
              i === projectIdx ? (
                <motion.div
                  key={i}
                  className="bg-[#181818] rounded-xl p-8 shadow-xl transition-all duration-300 scale-105 z-10 border border-[#e50914]"
                  style={{
                    minWidth: 340,
                    maxWidth: 400,
                    margin: "auto",
                  }}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <h3 className="text-2xl font-bold mb-2 text-[#e50914]">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 whitespace-pre-line">
                    {project.desc}
                  </p>
                </motion.div>
              ) : null
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
      </motion.section>
      {/* Thank You */}
      <motion.section
        ref={sectionRefs[6]}
        className="min-h-screen flex flex-col items-center justify-center w-full px-4 py-32"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-5xl font-extrabold mb-8 text-center text-[#e50914] drop-shadow-lg">
          Thank You
        </h2>
        <p className="text-xl text-center text-[#e5e5e5] font-bold">
          앞으로도 계속 배우고 만들며,
          <br />제 방식으로 세상과 연결될 수 있는 개발자가 되겠습니다.
        </p>
      </motion.section>
      {/* Contact */}
      <footer className="w-full py-4 text-center bg-[#272727] text-gray-200 border-t border-white/10 text-sm mt-0">
        Email : luckymoon4157@gmail.com &nbsp;|&nbsp; Phone : 010-2790-4157
        &nbsp;|&nbsp; Discord : @raon2790 &nbsp;|&nbsp; Github :{" "}
        <a
          href="https://github.com/raon2790"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#e50914]"
        >
          raon2790
        </a>
      </footer>
    </motion.div>
  );
}

export default ScrollLinkedMoonJaeWoong;
