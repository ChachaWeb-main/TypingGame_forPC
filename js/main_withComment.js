// 厳格モード
'use strict';

{
  // [必要なHTML要素の取得]
  const wrap = document.getElementById('wrap');
  const start = document.getElementById('start');
  
  // [複数のテキストを格納する配列]
  const textLists = [
    'Hello JavaScript','This is my App','Are you alright?','Today is sunny','I love Japan!',
    'Good morning','I am Japanese','Let it be','Samurai','Typing Game','Information Technology',
    'I want to be a programmer','What day is today?','I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning','Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN','Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch','var let const','Windows Mac Linux iOS Android',
    'programming','Which do you prefer?','London NewYork Paris Tokyo','iPhone iPad AppleWatch','Animation',
    'Twitter Instagram TikTok',
  ]; 
  
  // [新しい配列を用意する]
  let checkTexts = [];
  /*------------------------------------------
  *  1.ランダムなテキストを画面に表示する
  *-----------------------------------------*/
  const createText = () => {
    const p = document.getElementById('text');
    // 配列のインデックス数からランダムな数値を生成する
    const rnd = Math.floor(Math.random() * textLists.length);
    /* 
    ボタンをクリックするたびにテキストがうしろに追加されていく現象が発生するため、
    p要素の中身を空っぽにする => p要素の中身は新しいテキストが表示される前にリセットされ、
    ボタンをクリックするたびに次々と新しいテキストが表示される。
    */
    p.textContent = '';
    // テキストを1文字ずつに分解し、画面に表示するテキスト情報をcheckTexts配列に格納する
    checkTexts = textLists[rnd].split('').map(value => {
      // span要素を生成する
      const span = document.createElement('span');
      // span要素に配列の1文字ずつを当てはめる
      span.textContent = value;
      // span要素をp要素に追加していく
      p.appendChild(span);

      // 1文字ずつcheckTextsに格納していく
      return span;
    })
  }; 
  createText(); // createText関数を実行する

  /*--------------------------------------
  *  2.キーイベント＆入力判定処理
  *-------------------------------------*/
  // スコアの初期値を設定する
  let score = 0;

  const keyDown = e => {
    // 背景色のデフォルト値を設定する
    wrap.style.backgroundColor = '#666';

    if(e.key == checkTexts[0].textContent) {
      // add-colorクラスを付与する
      checkTexts[0].className = 'add-color';
      // 配列から1文字を削除する
      checkTexts.shift();
      // 正しい入力の時だけスコアを加算する
      score++;
      // 最後まで入力したら新しいテキストを用意する(配列の中身が0になった時点でcreateText()関数が実行できるようになる)
      if(!checkTexts.length) createText();
    // (注)大文字入力でShiftキーを押した時は色が変わらないように
    } else if(e.key === 'Shift') {
      wrap.style.backgroundColor = '#666';
    // タイプミスした時だけ背景色を赤色に変える
    } else {
      wrap.style.backgroundColor = 'red';
    }
  }; 
  
  /*--------------------------------------
  *  3.ランク判定とメッセージ生成処理
  *-------------------------------------*/
  const rankCheck = rank => {
    // テキストを格納する変数を作る
    let text = '';
    
    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100) {
      text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200) {
      text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
    } else if(score < 300) {
      text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
    } else if(score >= 300) {
      text = `あなたのランクはSです。\nおめでとうございます！`;    
    }
    
    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました！\n${text}\n【OK】リトライ／【キャンセル】終了`;
  }; 
  
  /*-----------------------------
  *  4.ゲームの終了処理
  *----------------------------*/
  const gameOver = id => {
    // タイマーをストップする
    clearInterval(id);
    // スコアの値をrankCheck()に渡してダイアログで結果を表示する
    const result = confirm(rankCheck(score));
    // OKボタンをクリックされたらリロードする
    if(result) window.location.reload();
  }; 
  
  /*------------------------
  *  5.タイマー処理
  *-----------------------*/
  const timer = () => {
    // タイマーの初期値（60秒）
    let time = 60;
    // タイマー要素を取得する
    const count = document.getElementById('count');
    // setInterval() = 5秒間隔や10秒間隔etc, 一定の間隔で処理を実行し続けられるメソッド
    const id = setInterval(() => {
      // カウントが0になったらタイマーのIDをgameOver()に渡す
      if(time <= 0) gameOver(id);
      // タイマーの表示を1ずつ減らしていき、減らした数値をtextContentで画面に表示する
      count.textContent = time--;
    }, 1000); //setInterval()メソッドの第2引数には ミリ秒 を指定する決まり ex).100ミリ秒 => 0.1秒, 1000ミリ秒 => 1秒, 10000ミリ秒 => 10秒
  }; 
  
  
  // [ゲームスタート時の処理]
  start.addEventListener('click', () => {
    // タイマー処理(カウントダウン)の関数
    timer();

    // ランダムなテキストを表示する関数
    createText();

    // 誤操作を防ぐために「スタート」ボタンを非表示にする処理を追記
    start.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener('keydown', keyDown);
  }); 
  
}