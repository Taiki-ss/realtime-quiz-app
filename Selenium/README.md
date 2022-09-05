# Seleniumによる自動ユーザー追加

## 事前準備
- python3実行環境
- seleniumとchromedriverのインストール
- GCEのneo-nengインスタンスが立ち上がっていることを確認

## 実行コマンド
/Selenium/にいる状態で
```
python3 -c "import main; main.create_user()"
```
create_user関数の引数に数字を入れると登録人数を指定できる（何も入れなければ1人）