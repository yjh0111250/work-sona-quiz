(() => {
  const layer = (id, type, x, y, width, text, style = {}) => ({
    id,
    type,
    x,
    y,
    width,
    height: 10,
    scale: 1,
    rotate: 0,
    z: 2,
    text,
    style: {
      fontSize: 18,
      lineHeight: 1.35,
      letterSpacing: 0,
      color: '#171a1d',
      effect: 'none',
      ...style
    }
  });

  const dimensions = ['会议隐身', '临期救火', '表格秩序', '情绪补给', '视觉包装', '工位气象'];
  const profile = (index) => dimensions.map((_, current) => current === index ? 1 : 0);
  const score = (primary, secondary = null) => dimensions.map((_, index) => {
    if (index === primary) return 1;
    if (index === secondary) return 0.05;
    return 0;
  });
  const optionLayout = (index) => ({
    x: 8,
    y: [48, 60, 72, 84][index],
    width: 84,
    height: 10.2,
    style: { fontSize: 15, lineHeight: 1.25 }
  });
  const choice = (questionId, text, primary, secondary, index) => ({
    id: `${questionId}-${String.fromCharCode(97 + index)}`,
    text,
    weights: score(primary, secondary),
    layout: optionLayout(index)
  });
  const question = (id, index, lead, prompt, options) => ({
    id,
    route: `档案 ${String(index + 1).padStart(2, '0')} / 10`,
    scene: {
      id: `${id}-scene`,
      type: 'vector',
      text: String(index + 1).padStart(2, '0'),
      x: 78,
      y: 4,
      width: 16,
      height: 12,
      scale: 1,
      rotate: 0,
      z: 1,
      style: { fontSize: 54, color: '#c5bdae', effect: 'none' }
    },
    parts: [
      layer(`${id}-lead`, 'text', 9, 17, 78, lead, { fontSize: 14, lineHeight: 1.45, color: '#626761' }),
      layer(`${id}-prompt`, 'text', 9, 24, 82, prompt, { fontSize: 29, lineHeight: 1.14, color: '#171a1d' })
    ],
    options
  });

  globalThis.PERSONA_QUIZ_CONFIG = {
    schemaVersion: 2,
    project: {
      title: '工位物种鉴定所',
      storageKey: 'work-sona-quiz-v1',
      disclaimer: '这是一个娱乐化的工位观察，不构成心理、职业或医疗评估。'
    },
    theme: {
      preset: 'office-timecard',
      palette: {
        paper: '#f3eddd',
        ink: '#171a1d',
        accent: '#d6422b',
        secondary: '#2457d6',
        wash: '#d7dad3'
      },
      typography: {
        display: 'system-black',
        body: 'system-sans',
        scale: 1,
        tracking: -0.01
      },
      treatment: {
        radius: 2,
        border: 2,
        shadow: 'hard',
        texture: 'paper-grid'
      }
    },
    pages: {
      cover: {
        canvas: { height: 760 },
        layers: [
          layer('cover-tag', 'text', 9, 5, 64, 'INTERNAL FUN FILE / NO. 0099', {
            fontSize: 10,
            letterSpacing: 0.08,
            color: '#626761'
          }),
          {
            ...layer('cover-stamp', 'vector', 72, 5, 20, '仅供\n娱乐', {
              fontSize: 17,
              lineHeight: 1,
              color: '#d6422b'
            }),
            height: 12,
            rotate: -8
          },
          layer('cover-title', 'text', 9, 16, 76, '你今天\n是什么\n工位物种？', {
            fontSize: 46,
            lineHeight: 1.03,
            letterSpacing: -0.06
          }),
          layer('cover-rule', 'text', 9, 46, 82, '— — — — — — — — — — — —', {
            fontSize: 12,
            color: '#8c908a'
          }),
          layer('cover-copy', 'text', 9, 50, 68, '10 个下班前的小现场\n约 90 秒，看看你的工位求生本能。', {
            fontSize: 15,
            lineHeight: 1.55,
            color: '#626761'
          }),
          {
            ...layer('cover-art', 'vector', 9, 64, 82, '09:01', {
              fontSize: 82,
              letterSpacing: -0.08,
              color: '#171a1d'
            }),
            height: 17
          },
          layer('cover-data', 'text', 9, 79, 58, '打卡状态：待鉴定\n输出模式：随机应变', {
            fontSize: 12,
            lineHeight: 1.6,
            color: '#626761'
          }),
          {
            ...layer('cover-start', 'button', 50, 86, 42, '打卡开始 →', {
              fontSize: 14,
              color: '#f3eddd'
            }),
            height: 7.5
          },
          layer('cover-footnote', 'text', 9, 94, 82, '答案只在当前浏览器里计算，不上传。', {
            fontSize: 11,
            color: '#626761'
          })
        ]
      },
      quiz: {
        canvas: { height: 760 },
        baseLayers: [
          layer('quiz-route', 'text', 9, 6, 62, '档案 01 / 10', {
            fontSize: 12,
            letterSpacing: 0.06,
            color: '#d6422b'
          }),
          layer('quiz-tip', 'text', 9, 96, 82, '没有标准答案，选你真正会做的那一个。', {
            fontSize: 11,
            color: '#626761'
          })
        ],
        optionArea: { x: 8, y: 48, width: 84, gap: 1.8, itemHeight: 10.2 }
      },
      result: {
        canvas: { height: 760 },
        layers: [
          layer('result-owner', 'text', 9, 7, 50, '「你的昵称」', {
            fontSize: 14,
            color: '#626761'
          }),
          layer('result-kicker', 'text', 9, 14, 58, '你的工位物种编号', {
            fontSize: 12,
            letterSpacing: 0.06,
            color: '#d6422b'
          }),
          layer('result-name', 'dynamic', 9, 20, 62, '结果名称', {
            fontSize: 42,
            lineHeight: 1.03,
            letterSpacing: -0.05
          }),
          layer('result-role', 'dynamic', 9, 34, 60, '结果副标题', {
            fontSize: 18,
            color: '#2457d6'
          }),
          {
            ...layer('result-stamp', 'vector', 67, 18, 24, '已\n归档', {
              fontSize: 17,
              lineHeight: 1.05,
              color: '#d6422b'
            }),
            height: 14,
            rotate: -7
          },
          layer('result-barcode', 'text', 9, 43, 82, '||||| |||||| |||| |||||||  /  09:01', {
            fontSize: 13,
            letterSpacing: 0.02,
            color: '#8c908a'
          }),
          layer('result-copy', 'dynamic', 9, 51, 82, '结果长评', {
            fontSize: 16,
            lineHeight: 1.72
          }),
          layer('result-invite', 'text', 9, 72, 82, '把结果图发给同事，看看你们是不是同一种求生方式。', {
            fontSize: 13,
            lineHeight: 1.5,
            color: '#626761'
          }),
          {
            ...layer('result-share', 'button', 9, 81, 40, '保存结果图', {
              fontSize: 14,
              color: '#f3eddd'
            }),
            height: 7
          },
          {
            ...layer('result-retry', 'button', 55, 81, 28, '重新打卡', {
              fontSize: 14,
              color: '#171a1d'
            }),
            height: 7
          },
          layer('result-note', 'text', 9, 92, 82, '仅供娱乐 · 不构成心理、职业或医疗评估', {
            fontSize: 11,
            color: '#626761'
          })
        ]
      },
      share: {
        canvas: { height: 760 },
        layers: [
          layer('share-project', 'text', 9, 8, 72, '工位物种鉴定所 / INTERNAL FUN FILE', {
            fontSize: 11,
            letterSpacing: 0.05,
            color: '#626761'
          }),
          layer('share-owner', 'dynamic', 9, 17, 55, '你的昵称', {
            fontSize: 18,
            color: '#171a1d'
          }),
          layer('share-kicker', 'dynamic', 9, 28, 50, '你最像', {
            fontSize: 14,
            color: '#d6422b'
          }),
          layer('share-name', 'dynamic', 9, 35, 66, '结果名称', {
            fontSize: 42,
            lineHeight: 1.03,
            letterSpacing: -0.05
          }),
          layer('share-role', 'dynamic', 9, 49, 66, '结果副标题', {
            fontSize: 18,
            color: '#2457d6'
          }),
          {
            ...layer('share-stamp', 'vector', 69, 14, 22, '工位\n存档', {
              fontSize: 16,
              lineHeight: 1.05,
              color: '#d6422b'
            }),
            height: 13,
            rotate: -7
          },
          layer('share-copy', 'dynamic', 9, 59, 82, '结果长评', {
            fontSize: 16,
            lineHeight: 1.66
          }),
          layer('share-barcode', 'text', 9, 81, 82, '||||| |||||| |||| |||||||  /  09:01', {
            fontSize: 13,
            color: '#8c908a'
          }),
          layer('share-note', 'text', 9, 92, 82, '仅供娱乐，不构成心理、职业或医疗评估。', {
            fontSize: 11,
            color: '#626761'
          })
        ]
      }
    },
    dimensions,
    results: [
      {
        id: 'meeting-ghost',
        name: '会议隐身侠',
        role: '会议室里最安静的安全区',
        summary: '你很清楚，有些话不必说，有些会不必赢。别人还在抢发言权，你已经把存在感调到刚好不会被点名的位置。',
        profile: profile(0)
      },
      {
        id: 'deadline-firefighter',
        name: '临期战神',
        role: '截止日期附近的爆发型选手',
        summary: '别人看到的是 deadline，你看到的是启动信号。时间越紧，你越像一盏突然接上电源的应急灯。',
        profile: profile(1)
      },
      {
        id: 'spreadsheet-alchemist',
        name: '表格炼金师',
        role: '把混乱变成秩序的人',
        summary: '你相信混乱只是还没被编号。列表、版本号、颜色和筛选器，都能把一团乱麻变成可以交付的东西。',
        profile: profile(2)
      },
      {
        id: 'emotional-anchor',
        name: '情绪补给站',
        role: '团队气压的提前预警器',
        summary: '你很会读空气里的细小变化。别人还没说自己撑不住，你已经递过去一杯水，顺手把场面接住了。',
        profile: profile(3)
      },
      {
        id: 'deck-warrior',
        name: 'PPT战神',
        role: '第一眼效果负责人',
        summary: '你不一定最早做完，但一定最能让一页纸看起来贵。内容和版式之间，你选择先赢第一眼。',
        profile: profile(4)
      },
      {
        id: 'office-weather',
        name: '工位气象员',
        role: '靠云层和灯光预测职场天气',
        summary: '你看云、看灯、看群聊语气，就能判断今天适不适合推进。你的工位生存，靠的是一套自己的气象模型。',
        profile: profile(5)
      }
    ],
    questions: [
      question('q1', 0, '早上 9:01，电脑刚亮起来，桌面已经在提醒你生活不易。', '你先处理什么？', [
        choice('q1', '先把群聊折叠，假装它还没醒', 0, 5, 0),
        choice('q1', '看到哪份文件最急，先补两页', 1, 0, 1),
        choice('q1', '把桌面按优先级重新排一遍', 2, 0, 2),
        choice('q1', '先泡咖啡，观察今天办公室的气压', 5, 3, 3)
      ]),
      question('q2', 1, '领导突然说：“下午给个方案。”', '你的第一反应是？', [
        choice('q2', '拉个会，先确认边界和谁负责', 0, 2, 0),
        choice('q2', '不管了，先交一个能改的版本', 1, 4, 1),
        choice('q2', '先知道每个人卡在哪，再决定谁做什么', 3, 2, 2),
        choice('q2', '内容先放一边，先把版式做高级', 4, 1, 3)
      ]),
      question('q3', 2, '群里冒出一句：“这个谁跟进一下？”', '你会怎么落位？', [
        choice('q3', '先看群里谁开始沉默，判断这是不是坑', 5, 0, 0),
        choice('q3', '先问老板想看到什么效果', 4, 0, 1),
        choice('q3', '先私聊最焦虑的同事', 3, 0, 2),
        choice('q3', '先回复“我来”，然后开始救火', 1, 0, 3)
      ]),
      question('q4', 3, '周五 17:58，办公室已经开始安静。', '你最后两分钟在做什么？', [
        choice('q4', '先把同事那句“今天能走吗”听完', 3, 0, 0),
        choice('q4', '检查文件名、版本号和收件人', 2, 0, 1),
        choice('q4', '看领导办公室的灯还亮不亮', 5, 0, 2),
        choice('q4', '趁最后两分钟把封面再修一版', 4, 1, 3)
      ]),
      question('q5', 4, '打印机卡纸了，文件还有十分钟要交。', '你最先做什么？', [
        choice('q5', '先观察，谁会第一个出手', 0, 5, 0),
        choice('q5', '直接拆机器，先把纸救出来', 1, 2, 1),
        choice('q5', '搜维修步骤，按顺序排查', 2, 0, 2),
        choice('q5', '先把快崩溃的同事劝去喝水', 3, 0, 3)
      ]),
      question('q6', 5, '新任务只有一句话，需求像雾一样。', '你怎么把雾变成路？', [
        choice('q6', '先看老板今天的状态，决定问到多细', 5, 0, 0),
        choice('q6', '先做一版老板一眼能看懂的封面', 4, 1, 1),
        choice('q6', '把流程、输入输出和验收标准写清', 2, 0, 2),
        choice('q6', '先做能交的草稿，细节后面再补', 1, 4, 3)
      ]),
      question('q7', 6, '下午三点，电量见底，但工位还在运转。', '你怎么给自己续命？', [
        choice('q7', '下楼看天气，判断今天还要不要硬撑', 5, 0, 0),
        choice('q7', '找个空会议室待十分钟，恢复隐身', 0, 3, 1),
        choice('q7', '整理文件，让桌面重新有秩序', 2, 0, 2),
        choice('q7', '问一圈谁状态不好，先把气氛接住', 3, 0, 3)
      ]),
      question('q8', 7, '方案被打回，群里安静了三秒。', '你先做哪件事？', [
        choice('q8', '先静音，等这阵风过去', 0, 5, 0),
        choice('q8', '把反馈包装成一页“2.0 升级版”', 4, 1, 1),
        choice('q8', '逐条拆反馈，做一张修改清单', 2, 0, 2),
        choice('q8', '马上重做一版，赶在下一轮前交', 1, 4, 3)
      ]),
      question('q9', 8, '同事小声说：“我感觉今天要出事。”', '你听见了什么？', [
        choice('q9', '先让对方把话说完', 3, 0, 0),
        choice('q9', '先准备好数据，随时救场', 1, 2, 1),
        choice('q9', '先问需不需要拉个会', 0, 3, 2),
        choice('q9', '先看群里谁开始沉默，判断风向', 5, 0, 3)
      ]),
      question('q10', 9, '下班前最后三分钟，今天只差一个句号。', '你留下什么动作？', [
        choice('q10', '人还在工位，灵魂已经预报周末天气', 5, 3, 0),
        choice('q10', '提交前一秒还在改最后一页', 4, 1, 1),
        choice('q10', '关软件、归档、写明日清单', 2, 0, 2),
        choice('q10', '顺手问一句：你们明天还来吗', 3, 0, 3)
      ])
    ],
    scoringTestCases: [
      {
        name: '会议隐身路径',
        answers: [0, 0, 0, 1, 0, 0, 1, 0, 2, 2],
        expected: 'meeting-ghost'
      },
      {
        name: '临期救火路径',
        answers: [1, 1, 3, 3, 1, 3, 0, 3, 1, 1],
        expected: 'deadline-firefighter'
      },
      {
        name: '表格秩序路径',
        answers: [2, 2, 0, 1, 2, 2, 2, 2, 1, 2],
        expected: 'spreadsheet-alchemist'
      },
      {
        name: '情绪补给路径',
        answers: [3, 1, 2, 0, 3, 2, 3, 0, 0, 3],
        expected: 'emotional-anchor'
      },
      {
        name: '视觉包装路径',
        answers: [0, 3, 1, 3, 0, 1, 0, 1, 0, 0],
        expected: 'deck-warrior'
      },
      {
        name: '工位气象路径',
        answers: [3, 0, 0, 2, 0, 0, 0, 0, 3, 0],
        expected: 'office-weather'
      }
    ]
  };
})();
