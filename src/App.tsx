import { useEffect, useRef, useState } from 'react'
import './App.css'

const questions = [
  { category: '웹앱 기초', text: '웹앱은 웹 브라우저에서 사용할 수 있는 앱이다.', answer: true, explanation: '맞아요! 웹앱은 크롬, 엣지 같은 웹 브라우저에서 접속해 사용할 수 있어요.' },
  { category: '웹앱 기초', text: 'HTML은 주로 글자 색과 배경색을 꾸미는 역할을 한다.', answer: false, explanation: 'HTML은 제목, 문단 등 페이지의 구조를 만들어요. 색상과 디자인을 꾸미는 역할은 주로 CSS가 맡아요.' },
  { category: 'AI 기초', text: 'AI가 알려주는 정보는 언제나 정확하다.', answer: false, explanation: 'AI도 틀린 정보를 만들 수 있어요. 중요한 정보는 믿을 만한 자료와 비교해 확인해 보세요.' },
  { category: 'AI 기초', text: 'AI에게 요청할 때 원하는 내용을 구체적으로 설명하면 도움이 된다.', answer: true, explanation: '목적, 상황, 원하는 답변 형식을 구체적으로 알려주면 AI가 요청을 이해하는 데 도움이 돼요.' },
  { category: '웹앱 기초', text: '모든 웹앱에는 반드시 로그인 기능이 있어야 한다.', answer: false, explanation: '로그인이 없어도 웹앱을 만들 수 있어요. 이 퀴즈도 로그인 없이 사용할 수 있는 웹앱이에요!' },
]

function App() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const question = questions[index]
  const answered = selected !== null
  useEffect(() => { heading.current?.focus() }, [index, finished])
  function answer(value: boolean) {
    if (answered) return
    setSelected(value)
    if (value === question.answer) setScore(previous => previous + 1)
  }
  function next() {
    if (!answered) return
    if (index === questions.length - 1) setFinished(true)
    else { setIndex(previous => previous + 1); setSelected(null) }
  }
  function restart() {
    setIndex(0); setSelected(null); setScore(0); setFinished(false)
  }
  return (
    <div className="app-shell">
      <header><a className="brand" href="./"><span className="brand-icon" aria-hidden="true">O×</span>한입 퀴즈</a><span className="header-note">작은 퀴즈, 새로운 발견</span></header>
      <main>
        <div className="intro"><span className="eyebrow">가볍게 배우는 디지털 상식</span><h1>웹과 AI, 얼마나 알고 있나요?</h1><p>다섯 문제로 알아보는 웹앱과 AI의 기초.<br />몰라도 괜찮아요. 함께 배워봐요!</p></div>
        <section className="quiz-card" aria-label={finished ? '퀴즈 결과' : 'OX 퀴즈'}>
          {finished ? <div className="result">
            <span className="category">퀴즈 완료</span><div className="result-symbol" aria-hidden="true">✦</div>
            <h2 ref={heading} tabIndex={-1}>다섯 문제, 모두 풀었어요!</h2><p>오늘의 작은 배움이 하나 더 쌓였어요.</p>
            <div className="score"><strong>{score * 20}</strong><span> / 100점</span></div>
            <p>총 {questions.length}문제 중 <strong>{score}문제</strong> 정답</p>
            <p className="result-message">{score === 5 ? '완벽해요! 웹과 AI의 기초를 잘 알고 있네요.' : '잘했어요! 다시 풀면서 배운 내용을 기억해 보세요.'}</p>
            <button className="next-button" onClick={restart}>다시 풀기 <span aria-hidden="true">↻</span></button>
          </div> : <>
            <div className="card-top"><span className="category">{question.category}</span><span className="question-count"><strong>{String(index + 1).padStart(2, '0')}</strong> / 05</span></div>
            <div className="progress" role="progressbar" aria-label="완료한 문제" aria-valuenow={index + (answered ? 1 : 0)} aria-valuemin={0} aria-valuemax={5}>{questions.map((_, i) => <span key={i} className={i < index || (i === index && answered) ? 'complete' : i === index ? 'current' : ''} />)}</div>
            <div className="question-area"><span className="question-label">QUESTION {String(index + 1).padStart(2, '0')}</span><h2 ref={heading} tabIndex={-1}>{question.text}</h2><p>맞으면 O, 틀리면 X를 선택해 주세요.</p></div>
            <div className="answers">{[true, false].map(value => <button key={String(value)} className={`answer ${value ? 'answer-o' : 'answer-x'} ${selected === value ? 'selected' : ''}`} onClick={() => answer(value)} disabled={answered} aria-label={value ? 'O, 맞아요' : 'X, 아니에요'} aria-pressed={selected === value}><span className="answer-symbol" aria-hidden="true">{value ? 'O' : 'X'}</span><span>{value ? '맞아요' : '아니에요'}</span></button>)}</div>
            {answered ? <div className="feedback-area"><div className={`feedback ${selected === question.answer ? 'correct' : 'incorrect'}`} role="status"><strong>{selected === question.answer ? '정답이에요!' : '아쉬워요!'} 정답은 {question.answer ? 'O' : 'X'}예요.</strong><p>{question.explanation}</p></div><button className="next-button" onClick={next}>{index === 4 ? '결과 보기' : '다음 문제'}<span aria-hidden="true">→</span></button></div> : <p className="answer-hint">천천히 생각해도 괜찮아요. 시간 제한은 없어요.</p>}
          </>}
        </section>
        <div className="quiz-details"><span>쉬운 난이도</span><i /><span>총 5문제</span><i /><span>약 1분</span></div>
      </main><footer>하루 한입, 지식이 자라는 시간.</footer>
    </div>
  )
}
export default App
