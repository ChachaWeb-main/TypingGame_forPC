// 厳格モード
'use strict';

{
  const wrap = document.getElementById('wrap');
  const start = document.getElementById('start');

  const textLists = [
    'Hello JavaScript','This is my App','Are you alright?','Today is sunny','I love Japan!',
    'Good morning','I am Japanese','Let it be','Samurai','Typing Game','Information Technology',
    'I want to be a programmer','What day is today?','I want to build a web app','Nice to meet you',
    'Chrome Firefox Safari','machine learning','Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN','Thank you very much','Google Apple Amazon',
    'ECMAScript','console.log','for while if switch','var let const','Windows Mac Linux iOS Android',
    'programming','Which do you prefer?','London NewYork', 'Paris Tokyo','iPhone iPad AppleWatch','Animation',
    'Twitter Instagram Facebook',
  ]; 

  let checkTexts = [];
  /*------------------------------------------
  *  1.ランダムなテキストを画面に表示する
  *-----------------------------------------*/
  const createText = () => {
    const p = document.getElementById('text');
    const random = Math.floor(Math.random() * textLists.length);

    p.textContent = '';

    checkTexts = textLists[random].split('').map(value => {
      const span = document.createElement('span');
      span.textContent = value;
      p.appendChild(span);      
      return span;
      })
  };
  
  /*--------------------------------------
  *  2.キーイベント＆入力判定処理
  *-------------------------------------*/
  let score = 0; 
  // スコアの初期値を設定する
  const keyDown = e => {
    wrap.style.backgroundColor = '#666';
    if(e.key === checkTexts[0].textContent) {
      checkTexts[0].className = 'add-color';
      checkTexts.shift();
      score++;

      if(!checkTexts.length) createText();
    } else if(e.key === 'Shift') {
      wrap.style.backgroundColor = '#666';
    } else {
      wrap.style.backgroundColor = 'red';
    }
  };

  /*--------------------------------------
  *  3.ランク判定とメッセージ生成処理
  *-------------------------------------*/
  const rankCheck = score => {
    let text = '';
    
    if(score < 100) {
      text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
      text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
    } else if(score < 300) {
      text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
    } else if(score >= 300) {
      text = `あなたのランクはSです。\nおめでとうございます！`;    
    }
    
    return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
  };

  /*-----------------------------
  *  4.ゲームの終了処理
  *----------------------------*/
  const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));
    
    if(result) window.location.reload();
  };

  /*------------------------
  *  5.タイマー処理
  *-----------------------*/
  const timer = () => {
    let time = 60;
    const count = document.getElementById('count');
    const id = setInterval(() => {
      if(time <= 0) gameOver(id);

      count.textContent = time--;
    }, 1000);
  };

  start.addEventListener('click', () => {
    timer();
    createText();
    start.style.display = 'none';
    // rule.style.display = 'none';
    document.addEventListener('keydown', keyDown);
  })

}