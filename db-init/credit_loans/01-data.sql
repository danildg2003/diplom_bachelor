--
-- PostgreSQL database dump
--

\restrict xqQl4CgNoVPk7VL6CnIa1uygWcCFK50p4M1Bqsj3YL58icuYp1WJ0TVPGuO3dcN

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
-- Name: creditLoans; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "creditLoans";


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
-- Name: creditLoans; Type: TABLE; Schema: creditLoans; Owner: -
--

CREATE TABLE "creditLoans"."creditLoans" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "summCredit" integer NOT NULL,
    "stavkaCredit" integer NOT NULL,
    "srokCredit" integer NOT NULL
);


--
-- Name: credit_loans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.credit_loans (
    id integer NOT NULL,
    summcredit integer NOT NULL,
    stavkacredit integer NOT NULL,
    srokcredit integer NOT NULL
);


--
-- Name: credit_loans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.credit_loans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: credit_loans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.credit_loans_id_seq OWNED BY public.credit_loans.id;


--
-- Name: credit_loans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_loans ALTER COLUMN id SET DEFAULT nextval('public.credit_loans_id_seq'::regclass);


--
-- Data for Name: creditLoans; Type: TABLE DATA; Schema: creditLoans; Owner: -
--

COPY "creditLoans"."creditLoans" (id, "summCredit", "stavkaCredit", "srokCredit") FROM stdin;
5202c226-c8d9-4e93-a7fc-beda61310051	2500000	21	5
4463b260-4e5c-471b-905f-f4e37b1db94e	21000000	20	60
5f22f867-b8a2-45cc-9173-29d8c0870e1c	250000000	15	84
811b4b5c-de3e-4f8c-9455-5590dbb9c95c	2500000	25	24
4b34dec4-ccf0-40dc-891c-b0cf05491e70	234234235	14	1
\.


--
-- Data for Name: credit_loans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.credit_loans (id, summcredit, stavkacredit, srokcredit) FROM stdin;
1	100000	13	12
2	250000	10	24
3	500000	10	36
4	750000	11	48
5	1000000	9	60
6	100000	13	12
7	250000	10	24
8	500000	10	36
9	750000	11	48
10	1000000	9	60
\.


--
-- Name: credit_loans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.credit_loans_id_seq', 10, true);


--
-- Name: creditLoans PK_c0af6433bd9b5a68c842753fc95; Type: CONSTRAINT; Schema: creditLoans; Owner: -
--

ALTER TABLE ONLY "creditLoans"."creditLoans"
    ADD CONSTRAINT "PK_c0af6433bd9b5a68c842753fc95" PRIMARY KEY (id);


--
-- Name: creditLoans UQ_004f173aed68ac8292545eba33e; Type: CONSTRAINT; Schema: creditLoans; Owner: -
--

ALTER TABLE ONLY "creditLoans"."creditLoans"
    ADD CONSTRAINT "UQ_004f173aed68ac8292545eba33e" UNIQUE ("stavkaCredit");


--
-- Name: creditLoans UQ_d34ef69dfbd5b11e7748038df37; Type: CONSTRAINT; Schema: creditLoans; Owner: -
--

ALTER TABLE ONLY "creditLoans"."creditLoans"
    ADD CONSTRAINT "UQ_d34ef69dfbd5b11e7748038df37" UNIQUE ("srokCredit");


--
-- Name: credit_loans credit_loans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.credit_loans
    ADD CONSTRAINT credit_loans_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict xqQl4CgNoVPk7VL6CnIa1uygWcCFK50p4M1Bqsj3YL58icuYp1WJ0TVPGuO3dcN

