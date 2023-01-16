// type
import type { Prisma } from "@prisma/client";

/**
 * 2023/01/05 - 게시글들 초기 데이터 채우기 ( 26개 )
 * @returns 조건을 만족한 게시글들
 */
export const getDummyPost = (): Prisma.PostCreateManyInput[] => [
  // 베테랑
  {
    idx: "346646",
    category: "MOVIE",
    title: "베테랑",
    speech: `기사님... 맷돌 손잡이 알아요?
맷돌 손잡이를 어이라 그래요. 어이. 맷돌에 뭘 갈려고 집어넣고 맷돌을 돌리려고 하는데! 손잡이가 빠졌네? 이런 상황을 어이가 없다 그래요. 황당하잖아 아무것도 아닌 손잡이 때문에 해야될 일을 못하니까... 지금 내 기분이 그래...
어이가 없네...`,
    thumbnail:
      "https://image.jtbcplus.kr/data/contents/jam_photo/202207/05/9b407acf-c8d1-4cd2-b7da-bd0e14be0754.jpg",
  },
  // ========== 응답하라 1988 ==========
  {
    idx: "64010",
    category: "DRAMA",
    title: "응답하라 1988",
    speech:
      "아빠도 태어날 때부터 아빠가 아니잖아. 아빠도 아빠가 처음이니까 우리 딸이 좀 봐줘",
    episode: 1,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/hlAQurIC3SsMM5rjYR04eNoJRsb.jpg",
  },
  // ========== 나의 해방일지 ==========
  {
    idx: "154887",
    category: "DRAMA",
    title: "나의 해방일지",
    speech: `우리 다 행복했으면 좋겠어. 쨍하고 햇볕 난 것처럼 구겨진 것 하나 없이.`,
    episode: 2,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/mrOxruke1FI0Sx6v6BOdpu4yppZ.jpg",
    like: 60,
  },
  {
    idx: "154887",
    category: "DRAMA",
    title: "나의 해방일지",
    speech: `“얼른 겨울이 왔으면 좋겠다.”
“겨울엔 또 그럴껄. 얼른 여름왔으면 좋겠다고. 지금 기분 잘 기억해뒀다가 겨울에, 추울 때 다시 써먹자. 잘 충전해뒀다가, 겨울에.”
“그럼 겨울 기억을 지금 써먹으면 되잖아요. 추울 때 충전해둔 기분없어요?”`,
    episode: 2,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/mrOxruke1FI0Sx6v6BOdpu4yppZ.jpg",
    like: 66,
  },
  {
    idx: "154887",
    category: "DRAMA",
    title: "나의 해방일지",
    speech: `“왜 매일 술 마셔요?”
“아니면 뭐 해?”
“할 일 줘요? 술 말고 할 일 줘요? 날 추앙해요. 난 한 번도 채워진 적이 없어. 개새끼, 개새끼... 내가 만났던 놈들은 다 개새끼. 그러니까 날 추앙해요. 가득 채워지게. 조금 있으면 겨울이에요. 겨울이 오면 살아 있는 건 아무것도 없어요. 그렇게 앉아서 보고 있을 것도 없어요. 공장에 일도 없고, 낮부터 마시면서 쓰레기 같은 기분 견디는 거, 지옥 같을 거에요. 당신은 무슨 일이든 해야 돼요. 난 한 번은 채워지고 싶어. 그러니까 날 추앙해요. 사랑으론 안 돼. 추앙해요.”`,
    episode: 2,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/mrOxruke1FI0Sx6v6BOdpu4yppZ.jpg",
    like: 90,
  },
  {
    idx: "154887",
    category: "DRAMA",
    title: "나의 해방일지",
    speech: `“내가 영화를 혼자 봐서 헤어진 걸로 만들고, 걔가 새벽에 딴 놈이랑 톡해서 헤어진 걸로 만들어야 돼. 절대로 내가 별 볼일 없는 인간인 거 그게 들통나서 헤어지는 게 아니라! 나도 알아. 걔가 쥘 수 있는 패 중에 내가 최고의 패는 아니라는거. 더 좋은 패가 있겠다 싶겠지. 나도 알아.”`,
    episode: 3,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/mrOxruke1FI0Sx6v6BOdpu4yppZ.jpg",
  },
  {
    idx: "154887",
    category: "DRAMA",
    title: "나의 해방일지",
    speech: `“옛날엔 사과하는게 참 멋진 행동이었는데, 그쵸? 어떤 한 인간이 뼈를 깎는 그 고통을 감내하면서 자신을 성찰하고 용기있게 하는 행동이 사과였는데. 쓰읍... 언제부터 사과가 강요에 의한 비굴한 행동이 됐는지 모르겠어요. 이제 더 이상 용기있게 사과하는 사람을 볼 때의 그 감동을 느끼기 힘들어 졌다는게 참... 그래요.”`,
    episode: 6,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/mrOxruke1FI0Sx6v6BOdpu4yppZ.jpg",
  },
  // 환혼
  {
    idx: "135157",
    category: "DRAMA",
    title: "환혼",
    speech: `아무것도 하지 않을 거면 죽어버려`,
    episode: 10,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/6Ehy7pbWQYTfW2ft4uzHqN4mVdU.jpg",
    like: 100,
  },
  // 이번생은 처음이라
  {
    idx: "74074",
    category: "DRAMA",
    title: "이번 생은 처음이라",
    speech: `사람이 온다는 건 실로 어마어마한 일이다.
한 사람의 일생이 오기 때문이다.
부서지기 쉬운 그래서 부서지기도 했을
마음이 오는 것이다.

부서지기 쉬운,
그래서 부서지기도 했을
그의 마음이 내게 왔다.`,
    episode: 11,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/3J0KJ1HIvbxU6tY3aKgjvH3UDYD.jpg",
  },
  {
    idx: "74074",
    category: "DRAMA",
    title: "이번 생은 처음이라",
    speech: `"그 짧은 문장에 서른이라는 단어를  세 번이나 쓰다니. 신피질의 재앙이네요."
"네?"
"스무 살이니까, 서른 살이라서 곧 마흔인데, 시간이라는 걸 그렇게 분초로 나우어서 자신을 가두는 종족은 지구 상에 인간밖에 없습니다. 오직 인간만이 나이라는 약점을 공략해서 돈을 쓰고 감정을 소비하게 만들죠. 그게 인간이 진화의 대가로 얻은 신피질의 재앙이에요. 서른도, 마흔도 고양이에겐 똑같은 오늘일 뿐입니다."`,
    episode: 1,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/3J0KJ1HIvbxU6tY3aKgjvH3UDYD.jpg",
  },
  {
    idx: "74074",
    category: "DRAMA",
    title: "이번 생은 처음이라",
    speech: `모든 사람에게는 자기만의 19호실이 있다. 아무리 가까워도 남에게 들키고 싶지 않은 그런 방. 아무리 편해져도 초대할 수 없는 그런 방.`,
    episode: 13,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/3J0KJ1HIvbxU6tY3aKgjvH3UDYD.jpg",
    like: 99,
  },
  // 비밀의 숲
  {
    idx: "70626",
    category: "DRAMA",
    title: "비밀의 숲",
    speech: `사고라는 게 원래 1분 1초마다 매번 계속 발생하지 않습니다. 문제없다고 괜찮다고 원칙 무시하다가 어느 날 배가 가라앉고 건물이 무너지는 겁니다.`,
    episode: 3,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/b5qI2QVVToCc8eDfxbHQjlcuHQ3.jpg",
  },
  {
    idx: "70626",
    category: "DRAMA",
    title: "비밀의 숲",
    speech: `"얼마나 많은 사람이 이러한 이유로 선택을 빙자한 침묵을 강요받을까요? 난 타협할 수 없어요. 타협 안 합니다."
"나는 당한 사람도 당한 사람이지만 내가 매일 보는 동료들이, 내 옆의 완전 보통 사람들이 이러는 게, 난 이게 더 안 돼요. 이게 받아들이는 게.
"저 사람들이 죄다 처음부터 잔인하고 악마여서 저러겠어요? 하다 보니깐 되니깐 그러는 거예요. 눈감아주고 침묵하니까 누구 하나만 제대로 부릅뜨고 짖어주면 바꿀 수 있어요."`,
    episode: 8,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/b5qI2QVVToCc8eDfxbHQjlcuHQ3.jpg",
    like: 70,
  },
  {
    idx: "70626",
    category: "DRAMA",
    title: "비밀의 숲",
    speech: `모든 시작은 밥 한끼다.`,
    episode: 7,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/b5qI2QVVToCc8eDfxbHQjlcuHQ3.jpg",
  },
  // 재벌집 막내아들
  {
    idx: "153496",
    category: "DRAMA",
    title: "재벌집 막내아들",
    speech: `고등학교 3년 내내 아무 걱정 없이 공부에 전념할 수 있었던 것도 지금 이 순간 생계 대신 학업에만 전념할 수 있는 것도 든든한 부모의 경제적 심리적인 지원 덕분이라는 생각 안 해 봤어? 대를 이은 법조계 명문가인 너희 집안 건강한 몸, 좋은 머리 그 모든 게 태어날 때부터 너에게 공짜로 주어진 특권이라는 생각 정말 단 한 번도 안 해 본 거야?`,
    episode: 3,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/lRtxdLhnmaKYc65WfMHPrE4TuuI.jpg",
  },
  // 이상한 변호사 우영우
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `제 이름은 똑바로 읽어도 거꾸로 읽어도 우영우입니다. 기러기, 토마토, 스위스, 인도인, 별똥별, 우영우. ...역삼역?`,
    episode: 1,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `이 사건은 재미있습니다. 제가 좋아하는 고래 퀴즈 같아요. 몸무게가 22톤인 암컷 향고래가 500kg에 달하는 대왕오징어를 먹고 6시간 뒤 1.3톤짜리 알을 낳았다면 이 암컷 향고래의 몸무게는 얼마일까요? (정명석: 모르겠어요.) 정답은 ‘고래는 알을 낳을 수 없다’입니다. 고래는 포유류라 알이 아닌 새끼를 낳으니까요. 무게에만 초점을 맞추면 문제를 풀 수 없습니다. 핵심을 봐야 돼요.`,
    episode: 1,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `"미안해요. '그냥 보통 변호사'라는 말은 좀 실례인 거 같다."
"아, 괜찮습니다. 저는 그냥 보통 변호사가 아니니까요."`,
    episode: 1,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
    like: 50,
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `고래에게 수족관은 감옥입니다. 좁은 수조에 갇혀 냉동생선만 먹으며 휴일도 없이 1년 내내 쇼를 해야 하는 노예제도예요. 평균 수명이 40년인 돌고래들이 수족관에서는 겨우 4년밖에 살지 못합니다. 정신적 스트레스가 얼마나 큰지 아시겠습니까?`,
    episode: 4,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `너는 봄날의 햇살 같아. 로스쿨 다닐 때부터 그렇게 생각했어. 너는 나한테 강의실의 위치와 휴강 정보와 바뀐 시험범위를 알려주고, 동기들이 날 놀리거나 속이거나 따돌리지 못하게 하려고 노력해. 지금도 너는 내 물병을 열어주고, 다음에 구내식당에 또 김밥이 나오면 나한테 알려주겠다고 해. 너는, 밝고 따뜻하고 착하고 다정한 사람이야. 봄날의 햇살 최수연이야.`,
    episode: 5,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `내 말은요, 그냥 영우를 괴롭히고 싶은 거면서 정의로운 척하지 말란 말이에요. 진짜로 사내 부정을 문제 삼고 싶으면 대표님부터 문제 삼으세요. 왜 강자는 못 건드리면서 영우한테만 그래요?`,
    episode: 7,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `"아무래도 나한테는 자폐가 있으니깐..."
"야! 장애인 차별은 법으로 금지돼있어. 네 성적으로 아무 데도 못 가는 게 차별이고 부정이고 비리야! 무슨 수로 왔든 늦게라도 입사한 게 당연한 거라고!"`,
    episode: 8,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `우리, 전에도 이런 얘기 하지 않았나? 그때는 우변이 무단결근을 해서 페널티를 줘야 된다고 했었죠? 권민우 변호사 페널티 되게 좋아하네? 그래서 게시판에도 그런 글을 쓴 겁니까? 씁, 아니, 같이 일하다가 의견이 안 맞고 문제가 생기면 서로 얘기를 해서 풀고 해결을 해야죠. 매사에 잘잘못 가려서 상 주고 벌 주고, 난 그렇게 일 안 합니다.`,
    episode: 9,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `장애가 있으면, 좋아하는 마음만으로는 충분하지 않은 것 같습니다. 내가 사랑이라고 해도 다른 사람이 아니라고 하면 아닌 게 되기도 하니깐요.`,
    episode: 10,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `하지만 변호사는 사람이잖아요. 판사랑 검사하곤 달라요. 같은 사 자 돌림이라도, 판사랑 검사는 일 사(事)자를 쓰지만, 변호사는 선비 사(士)자를 쓰죠. 판사랑 검사한테는 사건 하나하나가 그냥 일일지 몰라도 변호사는 달라요. 우리는 선비로서, 그러니까 인간으로서 의뢰인 옆에 앉아있는 거에요. "당신 틀리지 않았다." "당신 지지한다." 그렇게 말하고 손 꽉 잡아주는 것도 우리가 해야 하는 거죠. 그럴려면 어느 의뢰인을 변호하는 것이 옳은지 스스로 판단해야 돼요. 자기 자신에게 거짓말 할 순 없잖아요.`,
    episode: 12,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
  },
  {
    idx: "197067",
    category: "DRAMA",
    title: "이상한 변호사 우영우",
    speech: `하지만 우영우 변호사는 정명석 변호사가 아니잖아요. 응? 나랑은 완전히 다른 사람인데 내가 무슨 조언을 하겠어요. 난 그저 우영우 변호사의 결정이 궁금할 뿐이에요. 우영우 변호사는, 음... 그냥 보통 변호사가 아니니까.`,
    episode: 16,
    thumbnail:
      "https://image.tmdb.org/t/p/w500/yv57TccCkgdy3St7rspBPKROeRK.jpg",
    like: 49,
  },
  // 날씨가 좋으면 찾아가겠어요
  {
    idx: "8952791169",
    category: "BOOK",
    title: "날씨가 좋으면 찾아가겠어요",
    speech: `"참, 그 낱말이 뭔지 혹시 알아? 물결에 햇빛이 비쳐서 반짝 반짝 빛나는 현상"
"윤슬, 이라고 해"`,
    page: 87,
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F648446%3Ftimestamp%3D20221231203952",
  },
  // ========== 행성 ==========
  {
    idx: "8932922365",
    category: "BOOK",
    title: "행성 1(양장본 HardCover)",
    speech: `아듀 피타고라스`,
    thumbnail:
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6073478%3Ftimestamp%3D20221011184805",
  },
];
