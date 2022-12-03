# coding:utf-8
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.alert import Alert
from time import sleep
# from selenium.webdriver.chrome import service as fs
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
		service = Service(ChromeDriverManager().install())
		driver = webdriver.Chrome(service=service, options=options)
		# Googleの検索TOP画面を開く
		driver.get("http://localhost:3000/realtime-quiz-app/")


		name_list = ['蒼崎青子','衛宮切嗣','言峰綺礼','静希草十郎','遠坂凛','遠野志貴','間桐桜','両儀式']
		name_input = driver.find_element(By.XPATH,'//*[@id="__next"]/div/main/div/div/div[1]/input')
		name_input.send_keys(random.choice(name_list))

		random_num = [1,2,3,4,5]
		porto_check = Select(driver.find_element(By.XPATH,'//*[@id="__next"]/div/main/div/div/div[2]/select'))
		porto_check.select_by_index(random.choice(random_num))

		random_point = range(10)
		point_input = driver.find_element(By.XPATH,'//*[@id="__next"]/div/main/div/div/div[3]/input')
		point_input.send_keys(random.choice(random_point))

		random_time = range(100)
		time_input = driver.find_element(By.XPATH,'//*[@id="__next"]/div/main/div/div/div[4]/input')
		time_input.send_keys(random.choice(random_time))

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