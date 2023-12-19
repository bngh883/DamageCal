$(function(){
    let pokemons = ['ニャオハ', 'ニャローテ', 'マスカーニャ', 'ホゲータ', 'アチゲータ', 'ラウドボーン', 'クワッス', 'ウェルカモ', 'ウェーニバル', 'グルトン', 'パフュートン♂', 'パフュートン♀', 
    'タマンチュラ', 'ワナイダー', 'マメバッタ', 'エクスレッグ', 'ハネッコ', 'ポポッコ', 'ワタッコ', 'ヤヤコマ', 'ヒノヤコマ', 'ファイアロー', 'パモ', 'パモット', 'パーモット', 'デルビル', 
    'ヘルガー', 'ヤングース', 'デカグース', 'ホシガリス', 'ヨクバリス', 'ヒマナッツ', 'キマワリ', 'コロボーシ', 'コロトック', 'コフキムシ', 'コフーライ', 'ビビヨン', 'ミツハニー', 'ビークイン', 
    'ココガラ', 'アオガラス', 'アーマーガア', 'ピンプク', 'ラッキー', 'ハピナス', 'ルリリ', 'マリル', 'マリルリ', 'アメタマ', 'アメモース', 'ブイゼル', 'フローゼル', 'ウパー', 'ウパー(パルデア)', 
    'ヌオー', 'ドオー', 'コダック', 'ゴルダック', 'カムカメ', 'カジリガメ', 'ププリン', 'プリン', 'プクリン', 'ラルトス', 'キルリア', 'サーナイト', 'エルレイド', 'スリープ', 'スリーパー', 
    'ゴース', 'ゴースト', 'ゲンガー', 'ワッカネズミ', 'イッカネズミ', 'ピチュー', 'ピカチュウ', 'ライチュウ', 'パピモッチ', 'バウッツェル', 'ナマケロ', 'ヤルキモノ', 'ケッキング', 'アマカジ', 
    'アママイコ', 'アマージョ', 'ミニーブ', 'オリーニョ', 'オリーヴァ', 'ウソハチ', 'ウソッキー', 'イワンコ', 'ルガルガン(昼)', 'ルガルガン(夜)', 'ルガルガン(黄昏)', 'タンドン', 'トロッゴン', 
    'セキタンザン', 'コリンク', 'ルクシオ', 'レントラー', 'ムックル', 'ムクバード', 'ムクホーク', 'オドリドリ(ぱちぱち)', 'オドリドリ(めらめら)', 'オドリドリ(ふらふら)', 'オドリドリ(まいまい)', 
    'メリープ', 'モココ', 'デンリュウ', 'チュリネ', 'ドレディア', 'キノココ', 'キノガッサ', 'カジッチュ', 'アップリュー', 'タルップル', 'バネブー', 'ブーピッグ', 'イキリンコ', 'ムウマ', 
    'ムウマージ', 'マクノシタ', 'ハリテヤマ', 'マケンカニ', 'ケケンカニ', 'ヤトウモリ', 'エンニュート', 'ゴマゾウ', 'ドンファン', 'ゾウドウ', 'ダイオウドウ', 'フカマル', 'ガバイト', 'ガブリアス', 
    'コジオ', 'ジオヅム', 'キョジオーン', 'キャモメ', 'ペリッパー', 'コイキング', 'ギャラドス', 'サシカマス', 'カマスジョー', 'バスラオ', 'ゴクリン', 'マルノーム', 'ニャース', 'ペルシアン', 
    'フワンテ', 'フワライド', 'フラベベ', 'フラエッテ', 'フラージェス', 'ディグダ', 'ダグトリオ', 'コータス', 'ドンメル', 'バクーダ', 'ドーミラー', 'ドータクン', 'キバゴ', 'オノンド', 
    'オノノクス', 'マンキー', 'オコリザル', 'コノヨザル', 'アサナン', 'チャーレム', 'リオル', 'ルカリオ', 'カルボウ', 'グレンアルマ', 'ソウブレイズ', 'ドジョッチ', 'ナマズン', 'ズピカ', 
    'ハラバリー', 'ヌメラ', 'ヌメイル', 'ヌメルゴン', 'グレッグル', 'ドクロッグ', 'カイデン', 'タイカイデン', 'イーブイ', 'シャワーズ', 'サンダース', 'ブースター', 'エーフィ', 'ブラッキー', 
    'リーフィア', 'グレイシア', 'ニンフィア', 'ノコッチ', 'ノココッチ', 'シキジカ', 'メブキジカ', 'キリンリキ', 'リキキリン', 'ベトベター', 'ベトベトン', 'オラチフ', 'マフィティフ', 'エレズン', 
    'ストリンダー', 'デデンネ', 'パチリス', 'シルシュルー', 'タギングル', 'オドシシ', 'タマゲタケ', 'モロバレル', 'ビリリダマ', 'マルマイン', 'コイル', 'レアコイル', 'ジバコイル', 'メタモン', 
    'ガーディ', 'ウインディ', 'ヒメグマ', 'リングマ', 'ザングース', 'ハブネーク', 'チルット', 'チルタリス', 'メェークル', 'ゴーゴート', 'ケンタロス(パ単)', 'ケンタロス(パ炎)', 'ケンタロス(パ水)', 
    'シシコ', 'カエンジシ', 'スカンプー', 'スカタンク', 'ゾロア', 'ゾロアーク', 'ニューラ', 'マニューラ', 'ヤミカラス', 'ドンカラス', 'ゴチム', 'ゴチミル', 'ゴチルゼル', 'ヤバチャ', 'ポットデス', 
    'ミミッキュ', 'クレッフィ', 'イエッサン♂', 'イエッサン♀', 'アノクサ', 'アノホラグサ', 'ノノクラゲ', 'リククラゲ', 'トロピウス', 'カリキリ', 'ラランテス', 'ガケガニ', 'カプサイジ', 'スコヴィラン', 'サボネア', 
    'ノクタス', 'シガロコ', 'ベラカス', 'コンパン', 'モルフォン', 'クヌギダマ', 'フォレトス', 'ストライク', 'ハッサム', 'ヘラクロス', 'ヒラヒナ', 'クエスパトラ', 'ヒポポタス', 'カバルドン', 
    'メグロコ', 'ワルビル', 'ワルビアル', 'スナヘビ', 'サダイジャ', 'ドロバンコ', 'バンバドロ', 'メラルバ', 'ウルガモス', 'タツベイ', 'コモルー', 'ボーマンダ', 'カヌチャン', 'ナカヌチャン', 
    'デカヌチャン', 'ミブリム', 'テブリム', 'ブリムオン', 'ベロバー', 'ギモー', 'オーロンゲ', 'ウミディグダ', 'ウミトリオ', 'オトシドリ', 'ナミイルカ', 'イルカマン(ナイーブ)', 
    'イルカマン(マイティ)', 'ブロロン', 'ブロロローム', 'モトトカゲ', 'ミミズズ', 'ヤミラミ', 'カゲボウズ', 'ジュペッタ', 'タイレーツ', 'ルチャブル', 'ミカルゲ', 'オンバット', 'オンバーン', 
    'ドラメシヤ', 'ドロンチ', 'ドラパルト', 'キラーメ', 'キラフロル', 'ロトム(通常)', 'ロトム(ヒート)', 'ロトム(ウォッシュ)', 'ロトム(フロスト)', 'ロトム(スピン)', 'ロトム(カット)', 'ボチ', 
    'ハカドッグ', 'ヤレユータン', 'ナゲツケサル', 'ネッコアラ', 'ヨーギラス', 'サナギラス', 'バンギラス', 'イシヘンジン', 'コオリッポ(アイス)', 'コオリッポ(ナイス)', 'バチンウニ', 'スナバァ', 
    'シロデスナ', 'ヤドン', 'ヤドラン', 'ヤドキング', 'カラナクシ', 'トリトドン', 'シェルダー', 'パルシェン', 'ハリーセン', 'ラブカス', 'ケイコウオ', 'ネオラント', 'ハギギシリ', 'ママンボウ', 
    'クズモー', 'ドラミドロ', 'ウデッポウ', 'ブロスター', 'シビシラス', 'シビビール', 'シビルドン', 'ヒドイデ', 'ドヒドイデ', 'カラミンゴ', 'ミニリュウ', 'ハクリュー', 'カイリュー', 'ユキハミ', 
    'モスノウ', 'ユキカブリ', 'ユキノオー', 'デリバード', 'クマシュン', 'ツンベアー', 'ユキワラシ', 'オニゴーリ', 'ユキメノコ', 'フリージオ', 'アルクジラ', 'ハルクジラ', 'カチコール', 
    'クレベース', 'ワシボン', 'ウォーグル', 'コマタナ', 'キリキザン', 'ドドゲザン', 'モノズ', 'ジヘッド', 'サザンドラ', 'ミガルーサ', 'ヘイラッシャ', 'シャリタツ', 'イダイナキバ', 
    'サケブシッポ', 'アラブルタケ', 'ハバタクカミ', 'チヲハウハネ', 'スナノケガワ', 'テツノワダチ', 'テツノツツミ', 'テツノカイナ', 'テツノコウベ', 'テツノドクガ', 'テツノイバラ', 'セビエ', 
    'セゴール', 'セグレイブ', 'コレクレー', 'サーフゴー', 'チオンジェン', 'パオジアン', 'ディンルー', 'イーユイ', 'トドロクツキ', 'テツノブジン', 'コライドン', 'ミライドン','ガーディ(ヒスイ)', 
    'ウインディ(ヒスイ)', 'ビリリダマ(ヒスイ)', 'マルマイン(ヒスイ)', 'バクフーン(ヒスイ)', 'ハリーセン(ヒスイ)', 'ニューラ(ヒスイ)', 'ダイケンキ(ヒスイ)', 'ドレディア(ヒスイ)', 'ウォーグル(ヒスイ)', 
    'ヌメイル(ヒスイ)', 'ヌメルゴン(ヒスイ)', 'クレベース(ヒスイ)', 'ジュナイパー(ヒスイ)', 'アヤシシ', 'バサギリ', 'ガチグマ', 'イダイトウ♂', 'イダイトウ♀', 'オオニューラ', 'ハリーマン', 'フリーザー', 
    'フリーザー(ガラル)', 'サンダー', 'サンダー(ガラル)', 'ファイヤー', 'ファイヤー(ガラル)', 'ミュウツー', 'ミュウ', 'カイオーガ', 'グラードン', 'レックウザ', 'ユクシー', 'エムリット', 'アグノム', 'ディアルガ', 
    'ディアルガ(オリジン)', 'パルキア', 'パルキア(オリジン)', 'ヒードラン', 'ギラティナ(アナザー)', 'ギラティナ(オリジン)', 'クレセリア', 'アルセウス', 'トルネロス(化身)', 'トルネロス(霊獣)', 'ボルトロス(化身)', 
    'ボルトロス(霊獣)', 'ランドロス(化身)', 'ランドロス(霊獣)', 'メロエッタ(ボイス)', 'メロエッタ(ステップ)', 'ディアンシー', 'フーパ(いましめ)', 'フーパ(はなたれ)', 'ボルケニオン', 'マギアナ', 'ザシアン(歴戦)', 
    'ザシアン(王)', 'ザマゼンタ(歴戦)', 'ザマゼンタ(王)', 'ムゲンダイナ', 'ダクマ', 'ウーラオス(連撃)', 'ウーラオス(一撃)', 'ザルード', 'レジエレキ', 'レジドラゴ', 'ブリザポス', 'レイスポス', 'バドレックス', 
    'バドレックス(黒馬)', 'バドレックス(白馬)', 'ラブトロス(化身)', 'ラブトロス(霊獣)', 'ライチュウ(アローラ)', 'ディグダ(アローラ)', 'ダグトリオ(アローラ)', 'ニャース(アローラ)', 'ペルシアン(アローラ)', 
    'ヤドン(ガラル)', 'ヤドラン(ガラル)', 'ベトベター(アローラ)', 'ベトベトン(アローラ)', 'ケンタロス', 'ヤドキング(ガラル)', 'バスラオ(白)', 'フォッコ', 'テールナー', 'マフォクシー', 'メレシー', 
    'サルノリ', 'バチンキー', 'ゴリランダー','カミッチュ', 'チャデス', 'ヤバソチャ', 'ガチグマ(アカツキ)', 'イイネイヌ', 'マシマシラ', 'キチキギス', 'オーガポン', 'オーガポン(かまど)', 'オーガポン(いど)', 
    'オーガポン(いしずえ)', 'グライガー', 'グライオン', 'ウッウ', 'エイパム', 'エテボース', 'モルペコ', 'イトマル', 'アリアドス', 'ヤンヤンマ', 'メガヤンマ', 'ポチエナ', 'グラエナ', 'バルビート', 'イルミーゼ',
    'ヘイガニ', 'シザリガー', 'クルミル', 'クルマユ', 'ハハコモリ', 'アブリー', 'アブリボン', 'アーボ', 'アーボック', 'マダツボミ', 'ウツドン', 'ウツボット', 'オタチ', 'オオタチ', 'ロコン', 'キュウコン', 
    'ニョロモ', 'ニョロゾ', 'ニョロボン', 'ニョロトノ', 'ホーホー', 'ヨルノズク', 'ウリムー', 'イノムー', 'マンムー', 'タネボー', 'コノハナ', 'ダーテング', 'ボクレー', 'オーロット', 'イシツブテ', 
    'ゴローン', 'ゴローニャ', 'ドッコラー', 'ドテッコツ', 'ローブシン', 'ゴンベ', 'カビゴン', 'ハスボー', 'ハスブレロ', 'ルンパッパ', 'ノズパス', 'ダイノーズ', 'アゴジムシ', 'デンヂムシ', 'クワガノン', 
    'サンド', 'サンドパン', 'バルチャイ', 'バルジーナ', 'ジャラコ', 'ジャランゴ', 'ジャラランガ', 'ドガース', 'マタドガス', 'コジョフー', 'コジョンド', 'ヨマワル', 'サマヨール', 'ヨノワール', 
    'リーシャン', 'チリーン', 'マグマッグ', 'マグカルゴ', 'ヒトモシ', 'ランプラー', 'シャンデラ', 'ピィ', 'ピッピ', 'ピクシー', 'ヒンバス', 'ミロカロス', 'コアルヒー', 'スワンナ', 'ナエトル', 
    'ハヤシガメ', 'ドダイトス', 'ヒコザル', 'モウカザル', 'ゴウカザル', 'ポッチャマ', 'ポッタイシ', 'エンペルト', 'サンド(アローラ)', 'サンドパン(アローラ)', 'ロコン(アローラ)', 
    'キュウコン(アローラ)', 'イシツブテ(アローラ)', 'ゴローン(アローラ)', 'ゴローニャ(アローラ)', 'マタドガス(ガラル)', 'ジラーチ', 'フィオネ', 'マナフィ', 'ダークライ', 'シェイミ(ランド)', 'シェイミ(スカイ)'];
    //$(".poke-name").autocomplete({
    //   source: pokemons,
    //});
    $(".poke-name").autocomplete({
        source: function(request, response) {
            var seatchStr = request.term; //入力文字列取得
            var list = [];
            $.each(pokemons, function(index, value){
                if (value.match(seatchStr) || value.match(hiraTokana(seatchStr)) || value.match(convertRomanToKana(seatchStr))) {
                    list.push(value);
                }
            })
            response(list);
        }
    })

    let moves = ['10まんばりき', '10まんボルト', '3ぼんのや', 'DDラリアット', 'Gのちから', 'Vジェネレート', 'アーマーキャノン', 'アームハンマー', 'アイアンテール', 'アイアンヘッド', 'アイアンローラー', 
                 'アイススピナー', 'アイスハンマー', 'あおいほのお', 'アクアカッター', 'アクアジェット', 'アクアステップ', 'アクアテール', 'アクアブレイク', 'あくうせつだん', 'アクセルブレイク', 
                 'アクセルロック', 'あくのはどう', 'アクロバット', 'アシストパワー', 'アシッドボム', 'アストラルビット', 'あてみなげ', 'あなをほる', 'あばれる', 'アフロブレイク', 'アンカーショット', 
                 'あんこくきょうだ', 'いあいぎり', 'イカサマ', 'いかりのまえば', 'いっちょうあがり', 'いてつくしせん', 'イナズマドライブ', 'いのちがけ', 'いびき', 'いわおとし', 'いわくだき', 
                 'いわなだれ', 'インファイト', 'ウェーブタックル', 'ウェザーボール', 'うずしお', 'うたかたのアリア', 'うちおとす', 'ウッドハンマー', 'ウッドホーン', 'うっぷんばらし', 'うらみつらみ', 
                 'エアカッター', 'エアスラッシュ', 'エアロブラスト', 'エコーボイス', 'えだづき', 'エナジーボール', 'エラがみ', 'エレキネット', 'エレキボール', 'オーバードライブ', 'オーバーヒート', 
                 'オーラウイング', 'オーラぐるま', 'オーロラビーム', 'オクタンほう', 'おどろかす', 'おはかまいり', 'かいりき', 'カウンター', 'かえんぐるま', 'かえんだん', 'かえんほうしゃ', 
                 'かえんボール', 'かかとおとし', 'かげうち', 'かげぬい', 'かぜおこし', 'かたきうち', 'かふんだんご', 'かみくだく', 'かみつく', 'かみなり', 'かみなりあらし', 'かみなりのキバ', 
                 'かみなりパンチ', 'がむしゃら', 'からげんき', 'ガリョウテンセイ', 'かわらわり', 'がんせきアックス', 'がんせきふうじ', 'がんせきほう', 'きあいだま', 'きあいパンチ', 'ギアソーサー', 
                 'ギガインパクト', 'ギガドレイン', 'きしかいせい', 'きゅうけつ', 'きょけんとつげき', 'きょじゅうざん', 'きょじゅうだん', 'キラースピン', 'きりさく', 'クイックターン', 'くさのちかい', 
                 'くさむすび', 'くさわけ', 'くらいつく', 'グラススライダー', 'グラスミキサー', 'クラブハンマー', 'グランドフォース', 'クリアスモッグ', 'グロウパンチ', 'クロスサンダー', 'クロスチョップ', 
                 'クロスフレイム', 'クロスポイズン', 'クロロブラスト', 'げきりん', 'けたぐり', 'ゲップ', 'げんしのちから', 'コアパニッシャー', 'こうげきしれい', 'こうそくスピン', 'ゴーストダイブ', 
                 'こおりのいぶき', 'こおりのキバ', 'こおりのつぶて', 'コールドフレア', 'ゴールドラッシュ', 'こがらしあらし', 'こごえるかぜ', 'こごえるせかい', 'ゴッドバード', 'こなゆき', 'このは', 
                 'コメットパンチ', 'ころがる', 'こんげんのはどう', 'サイケこうせん', 'サイコカッター', 'サイコキネシス', 'サイコショック', 'サイコファング', 'サイコブレイク', 'サウザンアロー', 'サウザンウェーブ', 
                 'さわぐ', 'サンダープリズン', 'ジェットパンチ', 'シェルアームズ', 'シェルブレード', 'しおづけ', 'しおふき', 'しおみず', 'じごくぐるま', 'じごくづき', 'シザークロス', 'じしん', 'しぜんのいかり', 
                 'したでなめる', 'じたばた', 'じだんだ', 'しっとのほのお', 'しっぺがえし', 'じならし', 'しねんのずつき', 'じばく', 'しめつける', 'ジャイロボール', 'シャドークロー', 'シャドースチール', 
                 'シャドーダイブ', 'シャドーパンチ', 'シャドーボール', 'シャドーボーン', 'シャドーレイ', 'じゃれつく', 'しんくうは', 'しんそく', 'じんつうりき', 'しんぴのちから', 'しんぴのつるぎ', 
                 'スイープビンタ', 'すいとる', 'すいりゅうれんだ', 'スケイルショット', 'スケイルノイズ', 'スターアサルト', 'スチームバースト', 'ずつき', 'すてみタックル', 'ストーンエッジ', 'すなじごく', 
                 'スパーク', 'スピードスター', 'スマートホーン', 'スモッグ', 'せいなるつるぎ', 'せいなるほのお', 'ソウルクラッシュ', 'ソーラービーム', 'ソーラーブレード', 'そらをとぶ', 
                 'たいあたり', 'だいちのちから', 'だいちのはどう', 'だいばくはつ', 'ダイビング', 'だいふんげき', 'ダイマックスほう', 'だいもんじ', 'ダイヤストーム', 'たきのぼり', 'だくりゅう', 'ダストシュート', 
                 'たたきつける', 'たたりめ', 'たつまき', 'タネばくだん', 'タネマシンガン', 'ダブルアタック', 'ダブルウイング', 'ダブルチョップ', 'ダブルパンツァー', 'ダメおし', 'だんがいのつるぎ', 'ちきゅうなげ', 
                 'チャージビーム', 'チャームボイス', 'ついばむ', 'ツインビーム', 'つけあがる', 'つじぎり', 'つつく', 'つっぱり', 'つのでつく', 'つばさでうつ', 'つばめがえし', 'つららおとし', 
                 'つららばり', 'つるのムチ', 'であいがしら', 'てかげん', 'デカハンマー', 'テクノバスター', 'デスウイング', 'てっていこうせん', 'テラバースト', 'でんきショック', 'でんげきくちばし', 'でんげきは', 
                 'でんこうせっか', 'でんこうそうげき', 'でんじほう', 'ときのほうこう', 'どくづき', 'どくどくのキバ', 'どくばり', 'どくばりセンボン', 'どげざつき', 'ドゲザン', 'とっしん', 'とっておき', 
                 'とどめばり', 'とびかかる', 'とびつく', 'とびはねる', 'とびひざげり', 'ともえなげ', 'トライアタック', 'ドラゴンアロー', 'ドラゴンエナジー', 'ドラゴンクロー', 'ドラゴンダイブ', 'ドラゴンテール', 
                 'ドラゴンハンマー', 'トラップシェル', 'トラバサミ', 'ドラムアタック', 'トリックフラワー', 'トリプルアクセル', 'トリプルキック', 'トリプルダイブ', 'ドリルくちばし', 'ドリルライナー', 
                 'ドレインキッス', 'ドレインパンチ', 'どろかけ', 'トロピカルキック', 'どろぼう', 'とんぼがえり', 'ナイトバースト', 'ナイトヘッド', 'なげつける', 'なみのり', 'にぎりつぶす', 'にどげり', 
                 'ニトロチャージ', 'ねこだまし', 'ネコにこばん', 'ネズミざん', 'ねっさのあらし', 'ねっさのだいち', 'ねっとう', 'ねっぷう', 'ねらいうち', 'ねんりき', 'のしかかり', 'バークアウト', 'ハードプラント', 
                 'ハイドロカノン', 'ハイドロポンプ', 'ハイパードリル', 'ハイパーボイス', 'はいよるいちげき', 'はかいこうせん', 'ばかぢから', 'はがねのつばさ', 'はきだす', 'ばくおんぱ', 'ばくれつパンチ', 
                 'はさむ', 'はたきおとす', 'はたく', 'はっけい', 'はっぱカッター', 'はどうだん', 'はなびらのまい', 'はなふぶき', 'バブルこうせん', 'はめつのねがい', 'パラボラチャージ', 
                 'バリア―ラッシュ', 'はるのあらし', 'バレットパンチ', 'パワーウィップ', 'パワージェム', 'ヒートスタンプ', 'ひけん・ちえなみ', 'ひっかく', 'ビックリヘッド', 'ひのこ', 'ひゃっきやこう', 'ひやみず', 
                 'ひょうざんおろし', 'びりびりちくちく', 'ふいうち', 'フェイタルクロー', 'フェイント', 'フォトンゲイザー', 'ぶきみなじゅもん', 'ふくろだたき', 'ぶちかまし', 'ふぶき', 'ふみつけ', 'フライングプレス',
                  'ブラストバーン', 'プラズマフィスト', 'フリーズドライ', 'フリーズボルト', 'ブリザードランス', 'プリズムレーザー', 'フルールカノン', 'フレアソング', 'フレアドライブ', 'ブレイククロー', 
                  'ブレイズキック', 'ブレイブバード', 'プレゼント', 'ふんえん', 'ふんか', 'ふんどのこぶし', 'ぶんまわす', 'ヘドロウェーブ', 'ヘドロこうげき', 'ヘドロばくだん', 'ベノムショック', 'ヘビーボンバー', 
                  'ホイールスピン', 'ポイズンテール', 'ほうでん', 'ぼうふう', 'ボーンラッシュ', 'ほしがる', 'ほっぺすりすり', 'ボディプレス', 'ホネブーメラン', 'ほのおのうず', 'ほのおのキバ', 'ほのおのちかい', 
                  'ほのおのパンチ', 'ほのおのまい', 'ほのおのムチ', 'ポルターガイスト', 'ボルテッカー', 'ボルトチェンジ', 'まきつく', 'マグマストーム', 'マジカルシャイン', 'マジカルフレイム', 'マジカルリーフ', 
                  'マッドショット', 'マッハパンチ', 'まとわりつく', 'マルチアタック', 'ミサイルばり', 'みずしゅりけん', 'みずでっぽう', 'ミストバースト', 'ミストボール', 'みずのちかい', 'みずのはどう', 
                  'みだれづき', 'みだれひっかき', 'みねうち', 'ミラーコート', 'みらいよち', 'ムーンフォース', 'ムゲンダイビーム', 'むしくい', 'むしのさざめき', 'むしのていこう', 'むねんのつるぎ', 'メガドレイン', 
                  'メガトンキック', 'メガトンパンチ', 'メガホーン', 'メタルクロー', 'メタルバースト', 'メテオドライブ', 'メテオビーム', 'もえあがるいかり', 'もえつきる', 'もろはのずつき', 'やきつくす', 
                  'やまあらし', 'ゆきなだれ', 'ゆめくい', 'ようかいえき', 'ようせいのかぜ', 'らいげき', 'ライジングボルト', 'らいめいげり', 'ラスターカノン', 'ラスターパージ', 'リーフストーム', 'リーフブレード', 
                  'リベンジ', 'りゅうせいぐん', 'りゅうのいぶき', 'りゅうのはどう', 'りんごさん', 'りんしょう', 'ルミナコリジョン', 'レイジングブル', 'れいとうパンチ', 'れいとうビーム', 'れんごく', 'れんぞくぎり', 
                  'ローキック', 'ロケットずつき', 'ロックブラスト', 'ワイドフォース', 'ワイドブレイカー', 'ワイルドボルト', 'わるあがき', 'ワンダースチーム', 'シャカシャカほう', 'ツタこんぼう', 'ブラッドムーン', 
                  'みずあめボム','エレクトロビーム' ,'きまぐレーザー' ,'サイコノイズ' ,'サンダーダイブ' ,'じんらい' ,'タキオンカッター' ,'テラクラスター' ,'はやてがえし' ,'パワフルエッジ' ,'みわくのボイス', 'やけっぱち',
                  'テラバースト(ステラ)', 'テラクラスター(ステラ)'];
    
    $(".move-name").autocomplete({
        source: function(request, response) {
            var seatchStr = request.term; //入力文字列取得
            var list = [];
            $.each(moves, function(index, value){
                if (value.match(seatchStr) || value.match(hiraTokana(seatchStr)) || value.match(convertRomanToKana(seatchStr)) || value.match(kanaToHira(convertRomanToKana(seatchStr)))) {
                    list.push(value);
                }
            })
            response(list);
        }
    })

    function hiraTokana(str){
        return str.replace(/[\u3041-\u3096]/g, function(match) {
            var chr = match.charCodeAt(0) + 0x60;
            return String.fromCharCode(chr);
        });
    }
    function kanaToHira(str) {
        return str.replace(/[\u30a1-\u30f6]/g, function(match) {
            var chr = match.charCodeAt(0) - 0x60;
            return String.fromCharCode(chr);
        });
    }
     
    const tree = {
      a: 'ア', i: 'イ', u: 'ウ', e: 'エ', o: 'オ', 
      k: {
        a: 'カ', i: 'キ', u: 'ク', e: 'ケ', o: 'コ',
        y: { a: 'キャ', i: 'キィ', u: 'キュ', e: 'キェ', o: 'キョ' },
      },
      s: {
        a: 'サ', i: 'シ', u: 'ス', e: 'セ', o: 'ソ',
        h: { a: 'シャ', i: 'シ', u: 'シュ', e: 'シェ', o: 'ショ' },
        y: { a: 'シャ', i: 'シィ', u: 'シュ', e: 'シェ', o: 'ショ' },
      },
      t: {
        a: 'タ', i: 'チ', u: 'ツ', e: 'テ', o: 'ト',
        h: { a: 'テャ', i: 'ティ', u: 'テュ', e: 'テェ', o: 'テョ' },
        y: { a: 'チャ', i: 'チィ', u: 'チュ', e: 'チェ', o: 'チョ' },
        s: { a: 'ツァ', i: 'ツィ', u: 'ツ', e: 'ツェ', o: 'ツォ' },
      },
      c: {
        a: 'カ', i: 'シ', u: 'ク', e: 'セ', o: 'コ',
        h: { a: 'チャ', i: 'チ', u: 'チュ', e: 'チェ', o: 'チョ' },
        y: { a: 'チャ', i: 'チィ', u: 'チュ', e: 'チェ', o: 'チョ' },
      },
      q: {
        a: 'クァ', i: 'クィ', u: 'ク', e: 'クェ', o: 'クォ',
      },
      n: {
        a: 'ナ', i: 'ニ', u: 'ヌ', e: 'ネ', o: 'ノ', n: 'ン',
        y: { a: 'ニャ', i: 'ニィ', u: 'ニュ', e: 'ニェ', o: 'ニョ' },
      },
      h: {
        a: 'ハ', i: 'ヒ', u: 'フ', e: 'ヘ', o: 'ホ',
        y: { a: 'ヒャ', i: 'ヒィ', u: 'ヒュ', e: 'ヒェ', o: 'ヒョ' },
      },
      f: {
        a: 'ファ', i: 'フィ', u: 'フ', e: 'フェ', o: 'フォ',
        y: { a: 'フャ', u: 'フュ', o: 'フョ' },
      },
      m: {
        a: 'マ', i: 'ミ', u: 'ム', e: 'メ', o: 'モ',
        y: { a: 'ミャ', i: 'ミィ', u: 'ミュ', e: 'ミェ', o: 'ミョ' },
      },
      y: { a: 'ヤ', i: 'イ', u: 'ユ', e: 'イェ', o: 'ヨ' },
      r: {
        a: 'ラ', i: 'リ', u: 'ル', e: 'レ', o: 'ロ',
        y: { a: 'リャ', i: 'リィ', u: 'リュ', e: 'リェ', o: 'リョ' },
      },
      w: { a: 'ワ', i: 'ウィ', u: 'ウ', e: 'ウェ', o: 'ヲ' },
      g: {
        a: 'ガ', i: 'ギ', u: 'グ', e: 'ゲ', o: 'ゴ',
        y: { a: 'ギャ', i: 'ギィ', u: 'ギュ', e: 'ギェ', o: 'ギョ' },
      },
      z: {
        a: 'ザ', i: 'ジ', u: 'ズ', e: 'ゼ', o: 'ゾ',
        y: { a: 'ジャ', i: 'ジィ', u: 'ジュ', e: 'ジェ', o: 'ジョ' },
      },
      j: {
        a: 'ジャ', i: 'ジ', u: 'ジュ', e: 'ジェ', o: 'ジョ',
        y: { a: 'ジャ', i: 'ジィ', u: 'ジュ', e: 'ジェ', o: 'ジョ' },
      },
      d: {
        a: 'ダ', i: 'ヂ', u: 'ヅ', e: 'デ', o: 'ド',
        h: { a: 'デャ', i: 'ディ', u: 'デュ', e: 'デェ', o: 'デョ' },
        y: { a: 'ヂャ', i: 'ヂィ', u: 'ヂュ', e: 'ヂェ', o: 'ヂョ' },
      },
      b: {
        a: 'バ', i: 'ビ', u: 'ブ', e: 'ベ', o: 'ボ',
        y: { a: 'ビャ', i: 'ビィ', u: 'ビュ', e: 'ビェ', o: 'ビョ' },
      },
      v: {
        a: 'ヴァ', i: 'ヴィ', u: 'ヴ', e: 'ヴェ', o: 'ヴォ',
        y: { a: 'ヴャ', i: 'ヴィ', u: 'ヴュ', e: 'ヴェ', o: 'ヴョ' },
      },
      p: {
        a: 'パ', i: 'ピ', u: 'プ', e: 'ペ', o: 'ポ',
        y: { a: 'ピャ', i: 'ピィ', u: 'ピュ', e: 'ピェ', o: 'ピョ' },
      },
      x: {
        a: 'ァ', i: 'ィ', u: 'ゥ', e: 'ェ', o: 'ォ',
        y: {
          a: 'ャ', i: 'ィ', u: 'ュ', e: 'ェ', o: 'ョ',
        },
        t: {
          u: 'ッ',
          s: {
            u: 'ッ',
          },
        },
      },
      l: {
        a: 'ァ', i: 'ィ', u: 'ゥ', e: 'ェ', o: 'ォ',
        y: {
          a: 'ャ', i: 'ィ', u: 'ュ', e: 'ェ', o: 'ョ',
        },
        t: {
          u: 'ッ',
          s: {
            u: 'ッ',
          },
        },
      },
    };

    function convertRomanToKana(original) {
        const str = original.replace(/[Ａ-Ｚａ-ｚ]/, function(s) {String.fromCharCode(s.charCodeAt(0) - 65248)}).toLowerCase(), // 全角→半角→小文字
            len = str.length;
        let result = '',
            tmp = '',
            index = 0,
            node = tree;
        const push = function(char, toRoot) {
            toRoot = toRoot ? toRoot : true;
            result += char;
            tmp = '';
            node = toRoot ? tree : node;
        };
        while (index < len) {
            const char = str.charAt(index);
            if (char.match(/[a-z]/)) { // 英数字以外は考慮しない
                if (char in node) {
                    const next = node[char];
                    if (typeof next === 'string') {
                        push(next);
                    } else {
                        tmp += original.charAt(index);
                        node = next;
                    }
                    index++;
                    continue;
                }
                const prev = str.charAt(index - 1);
                if (prev && (prev === 'n' || prev === char)) { // 促音やnへの対応
                    push(prev === 'n' ? 'ン' : 'ッ', false);
                }
                if (node !== tree && char in tree) { // 今のノードがルート以外だった場合、仕切り直してチェックする
                    push(tmp);
                    continue;
                }
            }
            push(tmp + char);
            index++;
        }
        tmp = tmp.replace(/n$/, 'ン'); // 末尾のnは変換する
        push(tmp);
        return result;
    }
});