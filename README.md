# 한입 퀴즈

Vite + React + TypeScript로 만든 한국어 웹·AI OX 퀴즈입니다. 문제 5개를 한 문제씩 풀고, 정답 해설과 최종 점수를 확인할 수 있습니다. 로그인, 데이터베이스, 외부 API는 사용하지 않습니다.

## 실행

```sh
npm install
npm run dev
```

PowerShell 실행 정책으로 npm 실행이 막히면 `npm.cmd install`, `npm.cmd run dev`를 사용하세요.
터미널에 표시되는 로컬 주소를 브라우저에서 엽니다.

## 빌드

```sh
npm run build
npm run preview
```

빌드 결과는 `dist` 폴더에 생성됩니다. 문제와 해설은 `src/App.tsx`의 `questions` 배열에서 수정할 수 있습니다. 새로고침하면 진행 상황은 초기화됩니다.

## 직접 확인하기

- O → X → O → O → X 순서로 선택하면 100점입니다.
- 반대로 X → O → X → X → O를 선택하면 0점입니다.
- 선택 후 정답과 해설이 나타나고, 답을 다시 선택할 수 없는지 확인하세요.
- 마지막 문제에서 결과 보기를 누른 뒤 다시 풀기를 누르면 첫 문제로 돌아가고 점수가 초기화됩니다.
- 휴대폰 너비에서도 O/X 버튼과 해설이 보이는지 확인하세요.

## GitHub 및 Vercel

현재 폴더에 Git 저장소가 없다면 `git init` 후 파일을 커밋하고 본인의 GitHub 저장소를 연결해 push하세요.
Vercel에서 해당 저장소를 Import하고 다음 설정으로 배포합니다.

- Framework Preset: Vite
- Build Command: npm run build
- Output Directory: dist
- 환경 변수: 필요 없음
