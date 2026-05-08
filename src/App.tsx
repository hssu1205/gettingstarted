import { useMemo, useState } from 'react'
import './App.css'

type Lesson = {
  id: number
  title: string
  tag: string
  summary: string
  points: string[]
}

type FlowStep = {
  title: string
  detail: string
  command: string
}

type ChecklistItem = {
  id: string
  label: string
  hint: string
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: '웹 앱은 어떻게 보일까?',
    tag: 'Web App',
    summary:
      '브라우저, HTML, CSS, JavaScript가 협력해 화면과 상호작용을 만드는 과정을 이해합니다.',
    points: ['화면 구조는 HTML', '모양은 CSS', '동작은 JavaScript'],
  },
  {
    id: 2,
    title: 'React로 화면을 나누기',
    tag: 'React',
    summary:
      '복잡한 화면을 작은 컴포넌트로 쪼개고, 상태가 바뀌면 화면이 다시 그려지는 흐름을 익힙니다.',
    points: ['컴포넌트', 'props', 'state'],
  },
  {
    id: 3,
    title: 'TypeScript로 실수 줄이기',
    tag: 'TypeScript',
    summary:
      '데이터의 모양을 타입으로 약속해 오타와 잘못된 사용을 개발 중에 빨리 발견합니다.',
    points: ['type 정의', '자동완성', '빌드 전 오류 확인'],
  },
  {
    id: 4,
    title: 'GitHub와 Vercel로 공유하기',
    tag: 'Deploy',
    summary:
      '내 컴퓨터의 코드를 GitHub에 올리고 Vercel이 자동으로 웹 주소를 만들어 주는 배포 흐름을 배웁니다.',
    points: ['commit', 'push', 'import project'],
  },
]

const flowSteps: FlowStep[] = [
  {
    title: '프로젝트 실행',
    detail: 'Vite 개발 서버를 켜고 수정 결과를 바로 확인합니다.',
    command: 'npm run dev',
  },
  {
    title: '컴포넌트 만들기',
    detail: '카드, 버튼, 체크리스트처럼 반복되는 화면 조각을 React 컴포넌트로 정리합니다.',
    command: 'src/App.tsx',
  },
  {
    title: '타입 확인',
    detail: '학습 데이터의 구조를 TypeScript 타입으로 고정해 안전하게 수정합니다.',
    command: 'type Lesson = { ... }',
  },
  {
    title: '빌드 점검',
    detail: '배포 전에 실제 서비스용 파일이 만들어지는지 확인합니다.',
    command: 'npm run build',
  },
  {
    title: 'Vercel 배포',
    detail: 'GitHub 저장소를 Vercel에 연결하면 push할 때마다 새 버전이 배포됩니다.',
    command: 'GitHub -> Vercel',
  },
]

const checklistItems: ChecklistItem[] = [
  {
    id: 'run-dev',
    label: '개발 서버를 실행해 화면 확인하기',
    hint: '터미널에서 npm run dev를 실행합니다.',
  },
  {
    id: 'edit-component',
    label: '학습 카드 문구 하나 바꿔보기',
    hint: 'src/App.tsx의 lessons 배열을 수정합니다.',
  },
  {
    id: 'read-type',
    label: 'Lesson 타입이 어떤 데이터를 요구하는지 읽기',
    hint: 'title, tag, summary, points가 필요합니다.',
  },
  {
    id: 'build',
    label: '배포 전 빌드 성공 확인하기',
    hint: 'npm run build가 오류 없이 끝나야 합니다.',
  },
  {
    id: 'deploy',
    label: 'GitHub 저장소를 Vercel에 연결하기',
    hint: 'Vercel에서 Add New Project를 선택합니다.',
  },
]

function App() {
  const [completed, setCompleted] = useState<string[]>(['run-dev'])

  const completedCount = completed.length
  const progress = useMemo(
    () => Math.round((completedCount / checklistItems.length) * 100),
    [completedCount],
  )

  function toggleItem(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id],
    )
  }

  return (
    <main className="app-shell">
      <section className="hero-section" aria-labelledby="page-title">
        <div className="hero-copy">
          <p className="eyebrow">교육대학원생을 위한 첫 웹 앱</p>
          <h1 id="page-title">웹 앱 개발 입문</h1>
          <p className="hero-text">
            React와 TypeScript로 화면을 만들고, GitHub와 Vercel로 배포하는
            흐름을 한 번에 따라가도록 구성한 학습용 앱입니다.
          </p>
          <div className="hero-actions" aria-label="빠른 이동">
            <a href="#lessons">학습 카드 보기</a>
            <a href="#checklist">체크리스트 시작</a>
          </div>
        </div>

        <aside className="progress-panel" aria-label="학습 진행률">
          <span className="panel-label">오늘의 진행률</span>
          <strong>{progress}%</strong>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${progress}%` }} />
          </div>
          <p>
            {completedCount} / {checklistItems.length}개 완료
          </p>
        </aside>
      </section>

      <section className="section-block" id="lessons" aria-labelledby="lessons-title">
        <div className="section-heading">
          <p className="eyebrow">카드형 학습 콘텐츠</p>
          <h2 id="lessons-title">처음 배울 개념을 작게 나누기</h2>
        </div>

        <div className="lesson-grid">
          {lessons.map((lesson) => (
            <article className="lesson-card" key={lesson.id}>
              <div className="card-topline">
                <span>{lesson.tag}</span>
                <small>{String(lesson.id).padStart(2, '0')}</small>
              </div>
              <h3>{lesson.title}</h3>
              <p>{lesson.summary}</p>
              <ul>
                {lesson.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="flow-title">
        <div className="section-heading">
          <p className="eyebrow">단계별 개발 흐름</p>
          <h2 id="flow-title">로컬 개발부터 배포까지</h2>
        </div>

        <ol className="flow-list">
          {flowSteps.map((step, index) => (
            <li key={step.title}>
              <span className="step-number">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
              <code>{step.command}</code>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="section-block checklist-section"
        id="checklist"
        aria-labelledby="checklist-title"
      >
        <div className="section-heading">
          <p className="eyebrow">체크리스트</p>
          <h2 id="checklist-title">직접 눌러 보며 배우기</h2>
        </div>

        <div className="checklist">
          {checklistItems.map((item) => {
            const isChecked = completed.includes(item.id)

            return (
              <label className="check-item" key={item.id}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleItem(item.id)}
                />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
              </label>
            )
          })}
        </div>
      </section>
    </main>
  )
}

export default App
