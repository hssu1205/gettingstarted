import { useEffect, useRef, useState } from 'react'
import './App.css'

const questions = [
  { category: '웹앱 기초', text: '웹앱은 웹 브라우저에서 사용할 수 있는 앱이다.', answer: true, explanation: '맞아요! 웹앱은 크롬이나 사파리 같은 웹 브라우저에서 사용할 수 있어요.' },
  { category: 'AI 기초', text: 'AI가 알려주는 정보는 언제나 정확하다.', answer: false, explanation: 'AI도 틀린 정보를 만들 수 있어요. 중요한 정보는 믿을 수 있는 자료와 비교해 확인해 주세요.' },
  { category: '웹앱 기초', text: 'CSS는 웹페이지의 색상과 배치 같은 디자인을 담당한다.', answer: true, explanation: 'CSS는 글자 크기, 색상, 간격, 배치 등을 정해 웹페이지를 보기 좋게 만들어요.' },
  { category: 'AI 활용', text: 'AI는 글쓰기나 번역을 도와줄 수 있다.', answer: true, explanation: 'AI는 글의 초안을 만들거나 다른 언어로 번역하는 등 다양한 작업을 도와줄 수 있어요.' },
  { category: '웹앱 기초', text: '모든 웹앱은 사용하기 전에 반드시 로그인해야 한다.', answer: false, explanation: '로그인이 필요 없는 웹앱도 많아요. 지금 풀고 있는 퀴즈도 로그인 없이 사용할 수 있죠!' },
]

export default function App() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [finished, setFinished] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const question = questions[index]
  const selected = answers[index]
  const answered = selected !== undefined
  const correct = selected === question.answer
  const score = answers.filter((a, i) => a === questions[i].answer).length
  useEffect(() => { heading.current?.focus() }, [index, finished])
  function choose(answer: boolean) { if (!answered) setAnswers([...answers, answer]) }
  function restart() { setAnswers([]); setIndex(0); setFinished(false) }
  return <div className="app-shell">
    <header><a className="brand" href="./"><span className="brand-icon">OX</span>한입 퀴즈<span className="dot">.</span></a><span className="header-note">작은 퀴즈, 새로운 발견</span></header>
    <main>
      <div className="intro"><span className="eyebrow">가볍게 배우는 디지털 상식</span><h1>웹과 AI, 얼마나 알고 있나요?</h1><p>부담 없이 O 또는 X! 다섯 문제로 새로운 지식을 만나보세요.</p></div>
      <section className="quiz-card" aria-label={finished ? '퀴즈 결과' : 'OX 퀴즈'}>
        {finished ? <div className="result">
          <div className="result-icon" aria-hidden="true">✦</div><span className="eyebrow">퀴즈 완료</span>
          <h2 ref={heading} tabIndex={-1}>{score === 5 ? '모두 맞혔어요. 멋져요!' : '한 걸음 더 똑똑해졌어요!'}</h2><p>다섯 문제를 끝까지 풀었어요. 수고했어요!</p>
          <div className="score"><strong>{score * 20}</strong><span> / 100점</span></div><p>총 5문제 중 <strong>{score}문제</strong> 정답</p>
          <div className="result-dots">{answers.map((a,i) => <span key={i} className={a === questions[i].answer ? 'hit' : 'miss'} aria-label={`${i+1}번 ${a === questions[i].answer ? '정답' : '오답'}`}>{a === questions[i].answer ? 'O' : 'X'}</span>)}</div>
          <button className="next-button" onClick={restart}>다시 풀기 <span aria-hidden="true">↻</span></button>
        </div> : <>
          <div className="progress-label"><span>문제 <strong>{String(index+1).padStart(2,'0')}</strong><span className="total"> / 05</span></span><span className="level">쉬움 · 기초 상식</span></div>
          <div className="progress-track" role="progressbar" aria-label="완료한 문제" aria-valuenow={answers.length} aria-valuemin={0} aria-valuemax={5}><div style={{width: `${answers.length*20}%`}} /></div>
          <div className="question-area"><span className="category">{question.category}</span><h2 ref={heading} tabIndex={-1}>{question.text}</h2><p>맞으면 O, 틀리면 X를 선택해 주세요.</p></div>
          <div className="choices">{[true,false].map(value => <button key={String(value)} className={`choice ${value ? 'choice-o' : 'choice-x'} ${answered && selected === value ? 'selected' : ''}`} disabled={answered} aria-pressed={selected === value} aria-label={value ? 'O, 맞아요' : 'X, 아니에요'} onClick={() => choose(value)}><span className="choice-symbol" aria-hidden="true">{value ? 'O' : 'X'}</span><span>{value ? '맞아요' : '아니에요'}</span>{answered && selected === value && <span className="selected-label">내 선택</span>}</button>)}</div>
          {answered ? <div className="answer-area"><div className={`feedback ${correct ? 'correct' : 'incorrect'}`} role="status"><strong>{correct ? '✓ 정답이에요!' : '조금 아쉬워요!'} <span>정답은 {question.answer ? 'O' : 'X'}</span></strong><p>{question.explanation}</p></div><button className="next-button" onClick={() => index === 4 ? setFinished(true) : setIndex(index+1)}>{index === 4 ? '결과 보기' : '다음 문제'}<span aria-hidden="true">→</span></button></div> : <p className="answer-hint">천천히 생각해 보세요. 시간 제한은 없어요.</p>}
        </>}
      </section>
      <div className="quiz-meta"><span>5개의 쉬운 문제</span><span>약 1분</span><span>로그인 없이 바로</span></div>
    </main><footer>하루 한 입, 디지털 세상과 조금 더 가까이.</footer>
  </div>
}
