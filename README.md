# Point Counter

## なにか

miroのボード上でポイントカウントを行うためのアプリ

マーケットプレイスには公開していない

## 開発フロー

1. フィーチャーブランチ作成
2. 以下コマンドで開発環境を立ち上げる(http://localhsot:3600/)
```
npx http-server -p 3600
```
3. miroの開発環境(DEV team)に「Point Counter(DEV)」をインストール
   - インストール用リンクは[こちら](https://miro.com/app-install/?response_type=code&client_id=3458764590953329039&redirect_uri=%2Fapp-install%2Fconfirm%2F)
   - Point Conter(DEV) は http://localhsot:3600/ を向く設定にしている

4. 開発＆動作確認
   - miroのボード上で動作確認する場合、Networkタブを開いて「Disable cache」にチェックを入れておくとよい

5. リリース
   - PRをmainにマージすることでリリースされる
     - mainブランチのソースをGithub pagesでホストしているため
