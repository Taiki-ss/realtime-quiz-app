# coding:utf-8
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.alert import Alert
from time import sleep
from selenium.webdriver.chrome import service as fs
from selenium.common.exceptions import NoSuchElementException, NoAlertPresentException
import random

# 実行コマンド
# python3 -c "import main; main.create_user(登録したい人数)"

def create_user(num=1):
	num = num
	print_num = num
	while num > 0:
		print('残り',num,'人')
		# ブラウザを開く
		options = Options()
		options.add_argument('--headless')
		chrome_service = fs.Service(executable_path='/usr/local/bin/chromedriver')
		driver = webdriver.Chrome(service=chrome_service, chrome_options=options)
		# Googleの検索TOP画面を開く
		driver.get("https://ss:ss@dev.gcp.steamship.co.jp/engineer-king/")


		name_list = ['中野亮太','山﨑洋義','七種宙時','川谷純輝','前山こういちろう','吉本康二','金子智幸','橋本和可奈','大野洋平','若井光大','石田大揮','アムロ・レイ','シャア・アズナブル','カミーユ・ビダン','ジュドー・アーシタ','バナージ・リンクス','ハサウェイ・ノア','ヒイロ・ユイ','星のカービィ']
		name_input = driver.find_element(By.XPATH,'//*[@id="__next"]/div/main/div/div/div[1]/input')
		name_input.send_keys(random.choice(name_list))

		porto_check = Select(driver.find_element(By.XPATH,'//*[@id="__next"]/div/main/div/div/div[2]/select'))
		porto_check.select_by_index(1)

		random_num = [1,2,3,4,5]
		role_check = Select(driver.find_element(By.XPATH,'//*[@id="__next"]/div/main/div/div/div[3]/select'))
		role_check.select_by_index(random.choice(random_num))


		sleep(1)
		button = driver.find_element(By.XPATH,'//*[@id="__next"]/div/main/div/button')
		button.click()
		sleep(2)

		try:
			Alert(driver).accept()
		except NoAlertPresentException:
			pass
		sleep(2)

		# ブラウザを終了する。
		driver.close()
		num-=1

	print(print_num,"人登録完了")
	return