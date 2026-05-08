# 교육대학원생을 위한 웹 앱 개발 입문

Vite + React + TypeScript로 만든 학습용 프론트엔드 웹 앱입니다. 웹 앱의 기본 개념, React 컴포넌트, TypeScript 타입, GitHub와 Vercel 배포 흐름을 카드와 체크리스트로 익힐 수 있습니다.

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버가 실행되면 터미널에 표시되는 로컬 주소를 브라우저에서 열어 확인합니다.

## 빌드 확인

```bash
npm run build
```

빌드가 성공하면 `dist` 폴더에 배포용 정적 파일이 생성됩니다.

## GitHub에서 Vercel로 배포하기

1. GitHub에서 새 저장소를 만들고 이 프로젝트를 push합니다.
2. Vercel에 로그인한 뒤 `Add New Project`를 선택합니다.
3. GitHub 저장소를 선택하고 프레임워크가 `Vite`로 감지되는지 확인합니다.
4. 기본 설정 그대로 `Deploy`를 누릅니다.
5. 이후 GitHub에 push할 때마다 Vercel이 자동으로 새 버전을 배포합니다.

## 주요 기능

- 카드형 학습 콘텐츠
- 로컬 개발부터 배포까지의 단계별 흐름 안내
- 프론트엔드 상태만 사용하는 체크리스트
- 모바일과 데스크톱을 고려한 반응형 UI
