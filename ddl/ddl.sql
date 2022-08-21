-- CREATE TABLE orders (
--     order_id integer PRIMARY KEY,
--     product_no integer REFERENCES products (product_no),
--     quantity integer
-- );

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/** User untuk login maupun session */
CREATE TABLE Users (
  user_id text NOT NULL PRIMARY KEY,
  full_name varchar(50) default null,
  phone varchar(13) default null,
  email text unique not null,
  password text default null,
  is_active boolean default false,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

alter table users alter column full_name set default null; -- dev
alter table users alter column phone set default null; -- dev
alter table users alter column password set default null; -- dev

CREATE INDEX user_idx ON Users (is_active) INCLUDE (email);

CREATE TYPE status_account_bank AS ENUM ('INVALID_ACCOUNT_NUMBER', 'PENDING', 'SUCCESS'); -- dev

/** Account bank untuk organizer
  * Masih bingung account bank ini di user atau di tiap organizer
 */
CREATE TABLE account_bank (
  "account_bank_id" text NOT NULL PRIMARY KEY,
  "user_id" text unique not null,
  "bank_code" varchar(5) unique not null,
  "bank_account_number" varchar(16) not null,
  "bank_account_name" varchar(50) not null,
  "status" status_account_bank default 'PENDING',
  "is_default" boolean default false,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Tabel master bank yg di support */
CREATE TABLE master_bank (
  "bank_id" text NOT NULL PRIMARY KEY,
  "bank_code" varchar(5) not null,
  "bank_name" varchar(50) not null,
  "is_active" boolean default false,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE mutation_type AS ENUM ('IN', 'OUT'); -- dev

CREATE TABLE user_mutation_balance (
  "mutation_id" text NOT NULL PRIMARY KEY,
  "user_id" text not null,
  "amount" int not null,
  "balance" bigint not null,
  "mutation_type" mutation_type not null,
  "description" text not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Status Verification User */
CREATE TABLE status_verification (
  "status_verification_id" text NOT NULL PRIMARY KEY,
  "status_name" varchar(25) not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE gender AS ENUM ('MAN', 'WOMEN'); -- dev

/** Data pribadi personal tiap user
  * Setiap user yang ini mendaftar atau membuat organizer
  * diwajibkan untuk melengkapi biodata
 */
CREATE TABLE user_personal (
  "user_personal_id" text NOT NULL PRIMARY KEY,
  "user_id" text not null,
  "photo" text default 'default_picture.png',
  "gender" Gender default null,
  "birthdate" date not null,
  "birthplace" varchar(25) not null,
  "institution" varchar(50) not null,
  "status_verification_id" text not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Untuk crud tiap user bisa memiliki nama whistlist sesuai yang diinginkan */
CREATE TABLE user_whislist (
  "user_whislist_id" text NOT NULL PRIMARY KEY,
  "user_id" text not null,
  "whistlist_name" varchar(15) not null,
  "description" varchar(50) not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Item item yang dimasukkan whistlist ke dalam tiap kategori */
CREATE TABLE user_whislist_item (
  "user_whistlist_item_id" text NOT NULL PRIMARY KEY,
  "user_whislist_id" text not null,
  "event_id" text not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Level competition yang di support */
CREATE TABLE level_competition (
  "level_competition_id" text NOT NULL PRIMARY KEY,
  "level_competition_name" varchar(25) not null,
  "description" text default null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE event_type AS ENUM ('ONLINE', 'OFFLINE', 'MIX'); -- dev
CREATE TYPE announcement_type AS ENUM ('PRIVATE', 'PUBLIC'); -- dev
CREATE TYPE template_certificate_type AS ENUM ('DEFAULT', 'CUSTOM', 'OUTSIDE_APP'); -- dev

/** Tabel untuk menampung data event
  * dan sub event yang di support
 */
CREATE TABLE Event (
  "event_id" text NOT NULL PRIMARY KEY,
  "user_id" text not null,
  "organizer_id" text not null,
  "event_category_id" text not null,
  "event_name" varchar(255) not null,
  "slug" varchar(255) not null,
  "start_date" timestamp not null,
  "end_date" timestamp not null,
  "quota" int default null,
  "event_type" event_type default null,
  "poster_potrait" text not null,
  "poster_landscape" text not null,
  "description" text not null,
  "tnc" text default null,
  "include_certificate" boolean default false,
  "template_certificate" template_certificate_type default 'DEFAULT',
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Settingan untuk event lomba dll */
CREATE TABLE event_setting (
  "event_setting_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null,
  "has_timeline" boolean default false,
  "timeline_description" text default null,
  "announcement_type" announcement_type default 'PRIVATE',
  "is_team" boolean default false,
  "max_team_member" smallint default 1,
  "level_competition_id" text default null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Event Categories yg di support */
CREATE TABLE event_categories (
  "event_category_id" text NOT NULL PRIMARY KEY,
  "category_name" varchar(50) not null,
  "logo" text not null,
  "description" text not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** URI apaibla event itu online untuk bisa langsung redirect  */
CREATE TABLE url_event_online (
  "url_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null,
  "link_address" text not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE status_pricelist AS ENUM ('ACTIVE', 'INACTIVE','SOLD', 'EXPIRED');-- dev

/** Pricelist didalam event bisa lebih dari 1 jenis
  * dikarenakan untuk menunjang event konser dll
 */
CREATE TABLE pricelist_event (
  "pricelist_event_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null,
  "pricelist_name" varchar(16) not null,
  "quota" int not null,
  "price" int default 0,
  "start_date" timestamp not null,
  "end_date" timestamp not null,
  "status" status_pricelist default 'INACTIVE',
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
  -- "pricelist_type" text default null,
); -- dev

CREATE TYPE timeline_type AS ENUM ('ONLINE', 'OFFLINE'); -- dev
CREATE TYPE timeline_status AS ENUM ('WILL_COME', 'ON_GOING', 'FINISHED'); -- dev
CREATE TYPE timeline_label AS ENUM ('INFORMATION', 'URL_LINK', 'QUALIFICATION', 'ANNOUNCEMENT'); -- dev

/** Timeline event apabila event di setting has_timeline = true */
CREATE TABLE event_timeline (
  "event_timeline_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null,
  "timeline_number" smallint not null,
  "timeline_name" varchar(25) not null,
  "timeline_type" timeline_type not null,
  "timeline_label" timeline_label default 'INFORMATION',
  "description" text default null,
  "start_date" date not null,
  "end_date" date not null,
  "user_passed" int default null,
  "status" timeline_status not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE address_type AS ENUM ('USER', 'ORGANIZER','EVENT'); -- dev

/** Address untuk tiap role (USER,ORGANIZER,EVENT) */
CREATE TABLE Address (
  "address_id" text NOT NULL PRIMARY KEY,
  "address_type" address_type not null,
  "owner_id" text default null,
  "city" varchar(25) default null,
  "province" varchar(25) default null,
  "address" varchar(50) default null,
  "postal_code" varchar(5) default null,
  "latitude" text default null,
  "longitude" text default null,
  "is_default" boolean default true,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE member_organizer AS ENUM ('DEFAULT', 'VERIFIED','CORPORATE'); -- dev
CREATE TYPE status_organizer AS ENUM ('ACTIVE', 'INACTIVE','PENDING','BLOCKED','REVIEW'); -- dev

/** Tabel organizer yang digunakan untuk menampung sleuruh data organizer */
CREATE TABLE Organizer (
  "organizer_id" text NOT NULL PRIMARY KEY,
  "user_id" text not null,
  "organizer_name" varchar(50) not null,
  "slug" varchar(255) not null,
  "organization" varchar(50) not null,
  "description" varchar(100) default null,
  "address" varchar(255) default null,
  "email" varchar(50) not null,
  "phone" varchar(13) not null,
  "whatsapp" varchar(13) not null,
  "instagram" varchar(20) default null,
  "detail" text default null,
  "member" member_organizer default 'DEFAULT',
  "status" status_organizer default 'PENDING',
  "photo" text default null,
  "banner" text default null,
  "is_locked" boolean default false,
  "password" text default null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL,
  CONSTRAINT fk_user_id FOREIGN KEY("user_id") REFERENCES users("user_id") ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT slug_unique UNIQUE (slug),
); -- dev

/** Event document merupakan dokumen penunjang lomba yang ditampilkan kepada user */
CREATE TABLE event_document (
  "event_document_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null,
  "document_name" varchar(50) not null,
  "description" varchar(255) not null,
  "file_address" text not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE organizer_data_type AS ENUM ('KTP', 'NPWP'); -- dev
CREATE TYPE status_organizer_data AS ENUM ('PENDING', 'REVIEW', 'APPROVED','REJECTED'); -- dev

/** Organizer diizinkan untuk mendaftarkan lombanya apabila terdapat minimal 1 dokumen 
  * yang di approve oleh admin
  * Setiap organizer diwajibkan untuk mengupload dokumen
 */
CREATE TABLE organizer_data (
  "organizer_data_id" text NOT NULL PRIMARY KEY,
  "organizer_id" text not null,
  "organizer_data_type" organizer_data_type not null,
  "full_name" varchar(50) not null,
  "id_card_number" varchar(16) not null,
  "address" varchar(255) not null,
  "file_address" text default 'default_picture.png',
  "status" status_organizer_data default 'PENDING',
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Belum tau untuk apa */
CREATE TABLE participant_event (
  "participant_event_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null,
  "label" varchar(50) not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE banner_position AS ENUM ('HOMEPAGE', 'EVENT'); -- dev
CREATE TYPE banner_status AS ENUM ('WILL_COME','ON_GOING','ACTIVE','INACTIVE','EXPIRED'); -- dev

/** Banner untuk ditampilkan ke user */
CREATE TABLE master_banner (
  "banner_id" text NOT NULL PRIMARY KEY,
  "banner_name" varchar(50) not null,
  "position" banner_position not null,
  "file_addres" text not null,
  "url_link" text not null,
  "start_date" date not null,
  "end_date" date not null,
  "status" banner_status default 'ACTIVE',
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE INDEX position_status_idx ON master_banner (position,status) INCLUDE (status); -- dev

/** Table untuk menampung data transaksi */
CREATE TABLE transaction (
  "transaction_id" text NOT NULL PRIMARY KEY,
  "ref_number" text unique not null,
  "event_id" text not null,
  "user_id" text not null,
  "event_pricelist_id" text not null,
  "transfer_receipt" text not null,
  "status_id" text not null,
  "reason_id" text default null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE status_type AS ENUM ('EVENT','USER','ORGANIZER','VERIFICATION'); -- dev

/** Tabel untuk menampung seluruh status  */
CREATE TABLE Status (
  "status_id" varchar(2) PRIMARY KEY,
  "status_name" varchar(25) not null,
  "status_type" status_type not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Tabel untuk menampung seluruh Reason  */
CREATE TABLE reason (
  "reason_id" text NOT NULL PRIMARY KEY,
  "reason" varchar(25) not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Tabel untuk menampung master team / kelompok di tiap lomba yang is_team = true  */
CREATE TABLE master_team (
  "master_team_id" text NOT NULL PRIMARY KEY,
  "user_event_id" text not null, 
  "event_id" text not null, 
  "team_name" varchar(25) not null, 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE status_team_member AS ENUM ('PENDING', 'APPROVED','REJECTED'); -- dev

/** Tabel untuk menampung seluruh anggota dari master team  */
CREATE TABLE team_member (
  "team_member_id" text NOT NULL PRIMARY KEY,
  "user_id" text not null, 
  "master_team_id" text not null, 
  "is_captain" boolean default false, 
  "status" status_team_member default 'PENDING', 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Tabel untuk menampung team yang lolos di tiap timeline  */
CREATE TABLE team_qualified (
  "team_qualified_id" text NOT NULL PRIMARY KEY,
  "master_team_id" text not null, 
  "event_timeline_id" text not null, 
  "event_id" text not null, 
  "point" varchar(4) not null, 
  "label" varchar(15) default null, 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Tabel untuk menampung seluruh event yang dipunyai user
  * ditampung di tabel terpisah karena tim yg diassign tapi tidak mendaftar lomba
  * bakal bisa untuk view lomba yang diikuti
  */
CREATE TABLE user_event (
  "user_event_id" text NOT NULL PRIMARY KEY,
  "user_id" text not null, 
  "event_id" text not null, 
  "category_id" text not null, 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Mentor event is optional  */
CREATE TABLE mentor_event (
  "mentor_event_id" text NOT NULL PRIMARY KEY,
  "full_name" varchar(50) not null, 
  "email" varchar(50) not null, 
  "agency" varchar(50) not null, 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TYPE input_type_field AS ENUM ('TEXT', 'TEXTAREA', 'UPLOAD'); -- dev

/** Form yang di input organizer data yang dibutuhkan untuk penilaian  */
CREATE TABLE field_submit_event (
  "field_submit_event_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null, 
  "event_timeline_id" text not null, 
  "label" varchar(25) not null, 
  "input_type" input_type_field default 'TEXT', 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Data yang disubmit peserta di tiap field  */
CREATE TABLE submited_data_event (
  "field_submit_competition_id" text NOT NULL PRIMARY KEY,
  "field_submit_event_id" text not null, 
  "point" varchar(4) not null, 
  "master_team_id" text not null, 
  "event_id" text not null, 
  "event_timeline_id" text not null, 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Tabel untuk validasi dan entry event offline  */
CREATE TABLE offline_entry (
  "offline_entry_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null, 
  "event_timeline_id" text not null, 
  "entry_key" text not null,
  "barcode" text not null, 
  "is_checked" boolean default false, 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Tabel master certificate dari organizer  */
CREATE TABLE template_certificate_event (
  "template_certificate_event_id" text NOT NULL PRIMARY KEY,
  "event_id" text not null, 
  "organizer_id" text not null, 
  "url_template" text not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Certificate yang di share ke peserta lomba  */
CREATE TABLE certificate_participant (
  "certificate_participant_id" text NOT NULL PRIMARY KEY,
  "template_certificate_id" text not null, 
  "user_id" text not null, 
  "master_team_id" text not null,
  "event_id" text not null,
  "certificate_number" text not null,
  "label" varchar(25) not null,
  "link_certificate" text not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** PointCategoryEvent */
CREATE TABLE point_category_event (
  "point_category_event_id" text NOT NULL PRIMARY KEY,
  "category_name" text not null, 
  "min_point" varchar(4) not null, 
  "max_point" varchar(4) not null, 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

/** Teampoint */
CREATE TABLE team_point (
  "team_point_id" text NOT NULL PRIMARY KEY,
  "event_timeline_id" text not null, 
  "master_team_id" text not null, 
  "point_category_event_id" text not null, 
  "point" varchar(4) not null, 
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE TABLE user_verification_code (
  "user_verification_code_id" text NOT NULL PRIMARY KEY,
  "verification_code" varchar(6) not null,
  "email" varchar(50) not null,
  "retry" int default 0,
  "expired_date" timestamp not null,
	"created_at" timestamp NOT NULL,
	"created_by" text default NULL,
	"updated_at" timestamp default NULL,
	"updated_by" text default NULL
); -- dev

CREATE INDEX email_idx ON user_verification_code (email) INCLUDE (expired_date);

CREATE TABLE log_mail (
  "log_mail_id" text NOT NULL PRIMARY KEY,
  "description" varchar(50) not null,
  "recipient" text not null,
  "status" varchar(7) default 'SUCCESS',
  "response" text not null,
	"response_detail" text NOT NULL,
	"created_at" timestamp NOT NULL
); -- dev

CREATE TABLE feedback (
  "feedback_id" text NOT NULL PRIMARY KEY,
  "email" varchar(50) default null,
  "full_name" varchar(15) default null,
  "subject" varchar(15) not null,
  "description" text not null,
  "feedback_type" smallint not null default 1,
  "is_replied" boolean default false,
	"created_at" timestamp NOT NULL
); -- dev

comment on column feedback.feedback_type is '1: development, 2: feature, 3: apps'; -- dev
