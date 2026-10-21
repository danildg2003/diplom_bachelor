--
-- PostgreSQL database dump
--

\restrict d3y0tOdDDMoSIl8CgcSIvCU2ImyOPDUqewVy5HRN31ExxdwBQNvUVZW7rsEAbBe

-- Dumped from database version 17.11 (Debian 17.11-1.pgdg13+2)
-- Dumped by pg_dump version 17.11 (Debian 17.11-1.pgdg13+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: creditPrograms; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "creditPrograms";


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: creditPrograms; Type: TABLE; Schema: creditPrograms; Owner: -
--

CREATE TABLE "creditPrograms"."creditPrograms" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "creditProgram" character varying NOT NULL,
    "informationProgram" character varying NOT NULL
);


--
-- Data for Name: creditPrograms; Type: TABLE DATA; Schema: creditPrograms; Owner: -
--

COPY "creditPrograms"."creditPrograms" (id, "creditProgram", "informationProgram") FROM stdin;
6867cbe4-5939-46e0-8608-60fed4996d29	Ипотека	Программа для юр.лиц
75950518-2cdc-45f2-aeac-eb056ee55588	Кредитная карта	Оформление кредитной карты
\.


--
-- Name: creditPrograms PK_13321743743b565359afc77fbd5; Type: CONSTRAINT; Schema: creditPrograms; Owner: -
--

ALTER TABLE ONLY "creditPrograms"."creditPrograms"
    ADD CONSTRAINT "PK_13321743743b565359afc77fbd5" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict d3y0tOdDDMoSIl8CgcSIvCU2ImyOPDUqewVy5HRN31ExxdwBQNvUVZW7rsEAbBe

