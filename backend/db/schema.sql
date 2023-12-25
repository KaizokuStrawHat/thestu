--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-12-22 14:09:05

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 16525)
-- Name: studiodays; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studiodays (
    id integer NOT NULL,
    date character varying(10) NOT NULL,
    day character varying(20) NOT NULL
);


ALTER TABLE public.studiodays OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16524)
-- Name: studiodays_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studiodays_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.studiodays_id_seq OWNER TO postgres;

--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 218
-- Name: studiodays_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studiodays_id_seq OWNED BY public.studiodays.id;


--
-- TOC entry 221 (class 1259 OID 16532)
-- Name: studiotimeslots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.studiotimeslots (
    id integer NOT NULL,
    studioday_id integer,
    category character varying(20) NOT NULL,
    "startTime" integer NOT NULL,
    "endTime" integer NOT NULL,
    level character varying(20) NOT NULL,
    venue character varying(50) NOT NULL,
    teacher character varying(50)
);


ALTER TABLE public.studiotimeslots OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16531)
-- Name: studioschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.studioschedule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.studioschedule_id_seq OWNER TO postgres;

--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 220
-- Name: studioschedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.studioschedule_id_seq OWNED BY public.studiotimeslots.id;


--
-- TOC entry 223 (class 1259 OID 16544)
-- Name: teacherassignments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacherassignments (
    id integer NOT NULL,
    studioschedule_id integer,
    teacher_id integer
);


ALTER TABLE public.teacherassignments OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16543)
-- Name: teacherassignments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teacherassignments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teacherassignments_id_seq OWNER TO postgres;

--
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 222
-- Name: teacherassignments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teacherassignments_id_seq OWNED BY public.teacherassignments.id;


--
-- TOC entry 217 (class 1259 OID 16518)
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    type character varying(20) NOT NULL,
    picture_url character varying(255)
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16517)
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.teachers_id_seq OWNER TO postgres;

--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 216
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- TOC entry 3191 (class 2604 OID 16528)
-- Name: studiodays id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studiodays ALTER COLUMN id SET DEFAULT nextval('public.studiodays_id_seq'::regclass);


--
-- TOC entry 3192 (class 2604 OID 16535)
-- Name: studiotimeslots id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studiotimeslots ALTER COLUMN id SET DEFAULT nextval('public.studioschedule_id_seq'::regclass);


--
-- TOC entry 3193 (class 2604 OID 16547)
-- Name: teacherassignments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherassignments ALTER COLUMN id SET DEFAULT nextval('public.teacherassignments_id_seq'::regclass);


--
-- TOC entry 3190 (class 2604 OID 16521)
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- TOC entry 3197 (class 2606 OID 16530)
-- Name: studiodays studiodays_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studiodays
    ADD CONSTRAINT studiodays_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 16537)
-- Name: studiotimeslots studioschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studiotimeslots
    ADD CONSTRAINT studioschedule_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 16549)
-- Name: teacherassignments teacherassignments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherassignments
    ADD CONSTRAINT teacherassignments_pkey PRIMARY KEY (id);


--
-- TOC entry 3195 (class 2606 OID 16523)
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 16574)
-- Name: studiodays unique_date; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studiodays
    ADD CONSTRAINT unique_date UNIQUE (date);


--
-- TOC entry 3204 (class 2606 OID 16538)
-- Name: studiotimeslots studioschedule_studio_day_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.studiotimeslots
    ADD CONSTRAINT studioschedule_studio_day_id_fkey FOREIGN KEY (studioday_id) REFERENCES public.studiodays(id);


--
-- TOC entry 3205 (class 2606 OID 16550)
-- Name: teacherassignments teacherassignments_studio_schedule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherassignments
    ADD CONSTRAINT teacherassignments_studio_schedule_id_fkey FOREIGN KEY (studioschedule_id) REFERENCES public.studiotimeslots(id);


--
-- TOC entry 3206 (class 2606 OID 16555)
-- Name: teacherassignments teacherassignments_teacher_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacherassignments
    ADD CONSTRAINT teacherassignments_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES public.teachers(id);


-- Completed on 2023-12-22 14:09:05

--
-- PostgreSQL database dump complete
--

