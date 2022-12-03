# Seleniumによる自動ユーザー追加

## 事前準備
- python3実行環境
- seleniumとchromedriverのインストール
```
# .venv作成（.gitignoreに入れてね）
python -m venv .venv

# venv環境に入る
source .venv/bin/activate

# 必要なライブラリをインストール
pip install -r requirements.txt
```

- realtime-quizのnpmサーバーが起動している

## 実行コマンド
python/にいる状態で
```
python3 -c "import main; main.create_user()"
```
create_user関数の引数に数字を入れると登録人数を指定できる（何も入れなければ1人）
