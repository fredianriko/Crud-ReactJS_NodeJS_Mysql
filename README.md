# Crud-ReactJS_NodeJS_Mysql
# reminder 

challenge 1 week NDS


CRUD REACT JS(frontend, looks), Node JS(backend runtime), Express JS(for server, part of NodeJS module), MYSQL(database)

create database, in this project i use Mysql database and Mysql Workbench for monitoring

for this project to work make the database as follow

1. create database with name "karyawan"
2. create table with 

CREATE TABLE crud_karyawan (
id_karyawan int(3) NOT NULL AUTO INCREMENT ZERO FILL,
name_karyawan varchar(50) NOT NULL,
tanggal_masuk_kerja DATE NOT NULL,
input_date DATE NOT NULL,
update_date NOT NULL,
limit_reimburse VARCHAR(50) NOT NULL DEFAULT 'Rp.'
);

make sure your connection is on port 3306 with credential

host: 'localhost' <br/>
user: 'root' <br/>
pass: '' <-- empty <br/>
database: 'karyawan' <br/>
  
  
------------------------------------------------------------

Install dependency first

 ``npm install`` 

To start the server, get inside the "server" directory, with

  ``cd server``

then start the server using

``nodemon server``


open: locahost:3001 <br/>
api/get: localhost/3001/api/get <br/>
api/insert: localhost/3001/api/insert <br/>

--------------------------------------------------

start the client by getting inside the client folder

``cd client``

then start using

``npm start``

open port 3000

-------------------------------------



