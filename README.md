# IMPORT POSTMAN
1. buka postman
2. lalu import file ATS Backend Test.postman_collection.json yang ada di project
3. jika ingin menggunakan api bisnis logic, hit api token terlebih dahulu
4. lalu masukan ke Authorization di header

# Import Database
1. Buka Aplikasi DB anda, misal MySQL Workbench
2. import file database.sql yang ada di project, ada di menu Server -> Data Import
3. pilih yang import from Self-Contained file, pilih file database.sql yang ada di project
4. Start import

# How To Use API
- dalam collection terdapat 2 folder merchant dan customer
- masing-masing memiliki api `GET generate token`
- hit api `GET generate token`, untuk menggunkan api yang lainnya set dibagian header dan pilih Authorization isi value dari api `GET generate token` tersebut
- api `GET generate token` punya Merchant tidak bisa dipakai di Customer, begitu juga sebaliknya
