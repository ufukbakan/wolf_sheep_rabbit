--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.25
-- Dumped by pg_dump version 9.5.25

-- Started on 2022-02-27 18:10:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
--
-- TOC entry 2109 (class 1262 OID 166074)
-- Name: wolf_sheep_rabbit; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE wolf_sheep_rabbit WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Turkish_Turkey.1254' LC_CTYPE = 'Turkish_Turkey.1254';


ALTER DATABASE wolf_sheep_rabbit OWNER TO postgres;

\connect wolf_sheep_rabbit

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12355)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2112 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- TOC entry 549 (class 1247 OID 166076)
-- Name: player_choice; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.player_choice AS ENUM (
    'wolf',
    'sheep',
    'rabbit'
);


ALTER TYPE public.player_choice OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 182 (class 1259 OID 166085)
-- Name: game_rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.game_rooms (
    room_id integer NOT NULL,
    player1 text,
    player2 text,
    "player1-choice" public.player_choice,
    "player2-choice" public.player_choice
);


ALTER TABLE public.game_rooms OWNER TO postgres;

--
-- TOC entry 181 (class 1259 OID 166083)
-- Name: game_rooms_room_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.game_rooms_room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.game_rooms_room_id_seq OWNER TO postgres;

--
-- TOC entry 2113 (class 0 OID 0)
-- Dependencies: 181
-- Name: game_rooms_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.game_rooms_room_id_seq OWNED BY public.game_rooms.room_id;


--
-- TOC entry 1985 (class 2604 OID 166088)
-- Name: room_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_rooms ALTER COLUMN room_id SET DEFAULT nextval('public.game_rooms_room_id_seq'::regclass);


--
-- TOC entry 2103 (class 0 OID 166085)
-- Dependencies: 182
-- Data for Name: game_rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.game_rooms (room_id, player1, player2, "player1-choice", "player2-choice") VALUES (3, NULL, NULL, NULL, NULL);
INSERT INTO public.game_rooms (room_id, player1, player2, "player1-choice", "player2-choice") VALUES (4, NULL, NULL, NULL, NULL);
INSERT INTO public.game_rooms (room_id, player1, player2, "player1-choice", "player2-choice") VALUES (1, NULL, NULL, NULL, NULL);
INSERT INTO public.game_rooms (room_id, player1, player2, "player1-choice", "player2-choice") VALUES (2, NULL, NULL, NULL, NULL);


--
-- TOC entry 2114 (class 0 OID 0)
-- Dependencies: 181
-- Name: game_rooms_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.game_rooms_room_id_seq', 4, true);


--
-- TOC entry 1987 (class 2606 OID 166093)
-- Name: roomPK; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.game_rooms
    ADD CONSTRAINT "roomPK" PRIMARY KEY (room_id);


--
-- TOC entry 2111 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2022-02-27 18:10:58

--
-- PostgreSQL database dump complete
--

