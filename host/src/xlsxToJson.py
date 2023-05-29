import pandas as pd
import json
import os
def excel_to_json(excel_file_path, json_file_path):
    df = pd.read_excel(excel_file_path)
    json_data = df.to_json(orient='records', force_ascii=False)

    with open(json_file_path, 'w',encoding='utf-8') as json_file:
        json_file.write(json_data)

    print("Excel to JSON conversion completed successfully.")

# 엑셀 파일 경로와 JSON 파일 경로를 지정합니다.
current_dir = os.getcwd()
print("Current Directory:", current_dir)
excel_file_path = current_dir+'/host/src/서울시버스노선별정류소정보(20230509).xlsx'
json_file_path = current_dir+'/host/src/서울시버스노선별정류소정보(20230509).json'

# 함수를 호출하여 엑셀 파일을 JSON으로 변환합니다.
excel_to_json(excel_file_path, json_file_path)
excel_file_path = current_dir+'/host/src/운영기관_역사_코드정보_2023.02.22.xlsx'
json_file_path = current_dir+'/host/src/운영기관_역사_코드정보_2023.02.22.json'
excel_to_json(excel_file_path, json_file_path)
