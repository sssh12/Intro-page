import { motion, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function ScrollLinkedParkSuBin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
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
            setActiveIdx(sectionRefs.length - 1);
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
        className="h-screen overflow-y-auto bg-gradient-to-b from-[#23272f] via-[#18181c] to-[#23272f] text-[#e5e5e5] scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        <ParkSuBin sectionRefs={sectionRefs} />
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
  const labels = [
    "Intro",
    "About Me",
    "Interview",
    "Skills",
    "Projects",
    "Education",
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

function ParkSuBin({
  sectionRefs,
}: {
  sectionRefs: React.RefObject<HTMLDivElement | null>[];
}) {
  return (
    <div className="bg-transparent text-white">
      {/* Intro */}
      <motion.section
        ref={sectionRefs[0]}
        className="min-h-screen flex flex-col items-center justify-center w-full px-4 py-32"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "linear-gradient(135deg, #23272f 60%, #e50914 120%)",
        }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
            대학생
          </h1>
          <img
            src="/Intro-page/assets/images/박수빈.png"
            alt="박수빈"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-[#e50914] shadow-xl mb-6 bg-[#181818]"
          />
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow">
            박수빈
          </h3>
          <p className="text-lg md:text-2xl text-[#e5e5e5] text-center bg-[#181818]/80 rounded-xl px-8 py-4 border border-[#333] shadow font-medium max-w-xl">
            다양한 분야를 배우며 흥미를 찾는 소프트웨어학과 학생입니다.
          </p>
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
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg">
          About Me
        </h2>
        <div className="bg-[#181818]/90 rounded-2xl shadow-xl border border-[#333] p-8 max-w-xl w-full">
          <p className="text-lg text-[#e5e5e5] leading-relaxed text-center">
            저는 남을 도와주는 일에서 설명할 수 없는 행복과 즐거움을 느끼는
            사람입니다.
            <br />
            어릴 때부터 리더십을 발휘하는 일은 잘하지 못했지만, 무엇을 통해
            타인에게 도움이 될 수 있을지 고민해 온 끝에, 저는 누군가를
            서포트하고 지원하는 역할에 큰 보람을 느낀다는 사실을 알게
            되었습니다.
            <br />
            강한 멘탈과 참을성을 바탕으로, 소프트웨어를 통해 사람들의 삶을 더
            편리하게 만들어주고 싶은 학생이며, 현재 차근차근 기본기를 다져가며
            프론트엔드 개발에 깊은 관심을 가지고 성장해 나가고 있습니다.
          </p>
        </div>
      </motion.section>

      {/* Interview */}
      <motion.section
        ref={sectionRefs[2]}
        className="flex flex-col items-center justify-center w-full px-4 py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg">
          Interview
        </h2>
        <div className="flex flex-col gap-6 max-w-2xl w-full">
          <div className="bg-[#222] rounded-xl p-6 shadow border border-[#333]">
            <h5 className="text-lg font-semibold text-white mb-2">
              Q. 왜 소프트웨어(컴퓨터)분야를 선택하셨나요?
            </h5>
            <p className="text-[#d2d2d2]">
              어릴 때 친형의 영향을 받아 컴퓨터에 관심을 갖게 되었고, 혼자
              독학하거나 형의 도움을 받으며 자연스럽게 프로그래밍을 접하게
              되었습니다. 이런 경험을 통해 개발자라는 꿈이 생겼고, 앞으로
              소프트웨어로 사람들에게 도움이 되고 싶다는 목표를 갖게 되었습니다.
            </p>
          </div>
          <div className="bg-[#222] rounded-xl p-6 shadow border border-[#333]">
            <h5 className="text-lg font-semibold text-white mb-2">
              Q. 개발자로서 책을 추천한다면 그 책과 추천해주는 이유는?
            </h5>
            <p className="text-[#d2d2d2]">
              개발자가 된다면 추천하고 싶은 책은 엄태형 작가님의 "그럼에도
              불구하고 너무나 인간적인"입니다. 이 책은 개발자로서 단순히
              기술적인 내용을 다루는 것을 넘어, 개발자의 삶과 철학, 팀워크 등
              인간적인 측면까지 깊이 있게 다루고 있습니다. 이를 통해 개발
              과정에서 겪게 되는 인간관계 어려움과 사람간의 갈등을 이해하고
              해결하는 방법을 배울 수 있다고 생각해 추천 드리고 싶습니다.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Skills */}
      <motion.section
        ref={sectionRefs[3]}
        className="flex flex-col items-center justify-center w-full px-4 py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg">
          Skills
        </h2>
        <ul className="flex flex-wrap gap-4 justify-center">
          <li className="bg-[#232334] px-6 py-2 rounded-lg text-base text-[#e2e2e2] shadow">
            C++ (기본 문법 등 학습중)
          </li>
          <li className="bg-[#232334] px-6 py-2 rounded-lg text-base text-[#e2e2e2] shadow">
            HTML / CSS(기초)
          </li>
          <li className="bg-[#232334] px-6 py-2 rounded-lg text-base text-[#e2e2e2] shadow">
            JavaScript (기초)
          </li>
          <li className="bg-[#232334] px-6 py-2 rounded-lg text-base text-[#e2e2e2] shadow">
            Git & GitHub
          </li>
        </ul>
      </motion.section>

      {/* Projects */}
      <motion.section
        ref={sectionRefs[4]}
        className="flex flex-col items-center justify-center w-full px-4 py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg">
          Projects
        </h2>
        <h4 className="text-lg text-[#b6aaff] mt-4 mb-2">Single</h4>
        <ul>
          <li className="mb-6">
            <div className="relative w-full max-w-lg mx-auto">
              <img
                src="/Intro-page/assets/images/카페 사진.jpg"
                alt="카페 메뉴 사이트"
                className="rounded-xl w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-xl">
                <div className="text-xl font-bold mb-2">카페 메뉴 사이트</div>
                <div className="font-bold text-2xl mb-1">기획중</div>
                <div className="text-[#ff4b4b]">0.3%</div>
              </div>
            </div>
          </li>
        </ul>
        <h4 className="text-lg text-[#b6aaff] mt-4 mb-2">Team</h4>
        <ul>
          <li>
            <div className="relative w-full max-w-lg mx-auto">
              <img
                src="/Intro-page/assets/images/289.png"
                alt="요리 레시피 - 사진 페이지"
                className="rounded-xl w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-xl">
                <div className="text-xl font-bold mb-2">
                  요리 레시피 - 사진 페이지
                </div>
                <div className="font-bold text-2xl mb-1">진행중</div>
                <div className="text-[#ff4b4b]">20%</div>
              </div>
            </div>
          </li>
        </ul>
      </motion.section>

      {/* Education */}
      <motion.section
        ref={sectionRefs[5]}
        className="flex flex-col items-center justify-center w-full px-4 py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-4xl font-extrabold mb-8 text-[#e50914] tracking-tight drop-shadow-lg">
          Education
        </h2>
        <div className="flex flex-wrap gap-6 justify-center">
          <div className="bg-[#5643c9] text-white p-6 w-64 rounded-xl hover:bg-[#5a4de6] transition">
            <h4 className="text-lg font-bold mb-2">천안용곡중학교</h4>
            <ul>
              <li>2019~2021 졸업</li>
            </ul>
          </div>
          <div className="bg-[#5643c9] text-white p-6 w-64 rounded-xl hover:bg-[#5a4de6] transition">
            <h4 className="text-lg font-bold mb-2">천안청수고등학교</h4>
            <ul>
              <li>2022~2024 졸업</li>
            </ul>
          </div>
          <div className="bg-[#5643c9] text-white p-6 w-64 rounded-xl hover:bg-[#5a4de6] transition">
            <h4 className="text-lg font-bold mb-2">우송대학교</h4>
            <ul>
              <li>IT융합학부 컴퓨터·소프트웨어전공 2025~ (재학중)</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        ref={sectionRefs[6]}
        className="flex flex-col items-center justify-center w-full px-4 py-32 bg-transparent mt-24 relative"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-[#e50914] tracking-tight drop-shadow-lg">
          Contact
        </h2>
        <p className="text-base text-[#d2d2d2] mb-4 text-center">
          Email : Uslwer.obiie@gmail.com&nbsp; | &nbsp; Phone : 010-8864-6505
        </p>
        <a
          href="https://github.com/obiie289"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#e50914] text-white font-bold rounded-lg px-8 py-3 shadow hover:bg-[#b81d24] transition"
        >
          GitHub
        </a>
      </motion.section>

      {/* Thank You 섹션 */}
      <motion.section
        ref={sectionRefs[7]}
        className="min-h-screen flex flex-col items-center justify-center w-full px-4 py-32 bg-transparent"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-5xl font-extrabold mb-6 text-center text-[#e50914] drop-shadow-lg">
          Thank you
        </h2>
        <h3 className="text-2xl font-bold mb-4 text-white text-center">
          봐주셔서 감사합니다 :)
        </h3>
        <p className="text-lg text-[#e5e5e5] text-center max-w-xl">
          개발자로 성장하기 위해 낯선 기술에도 적극적으로 도전하고,
          <br />
          항상 배움의 자세로 사용하기 좋은 서비스를 만들어 나아가겠습니다.
        </p>
      </motion.section>

      {/* 푸터 */}
      <footer className="w-full py-4 text-center bg-[#181818] text-gray-300 border-t border-[#e50914]/20 text-sm mt-0 tracking-wide">
        © {new Date().getFullYear()} Park Su Bin. All rights reserved.
      </footer>
    </div>
  );
}

export default ScrollLinkedParkSuBin;
