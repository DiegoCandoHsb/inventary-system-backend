--
-- PostgreSQL database dump
--

-- Dumped from database version 14.8
-- Dumped by pg_dump version 14.8

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
-- Name: catalog; Type: TABLE; Schema: public; Owner: HSB
--

CREATE TABLE public.catalog (
    id integer NOT NULL,
    "catalogName" character varying NOT NULL
);


ALTER TABLE public.catalog OWNER TO "HSB";

--
-- Name: catalog_id_seq; Type: SEQUENCE; Schema: public; Owner: HSB
--

CREATE SEQUENCE public.catalog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.catalog_id_seq OWNER TO "HSB";

--
-- Name: catalog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: HSB
--

ALTER SEQUENCE public.catalog_id_seq OWNED BY public.catalog.id;


--
-- Name: catalogoption; Type: TABLE; Schema: public; Owner: HSB
--

CREATE TABLE public.catalogoption (
    id integer NOT NULL,
    "catalogDetail" character varying(250) NOT NULL,
    "catalogId" integer
);


ALTER TABLE public.catalogoption OWNER TO "HSB";

--
-- Name: catalogoption_id_seq; Type: SEQUENCE; Schema: public; Owner: HSB
--

CREATE SEQUENCE public.catalogoption_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.catalogoption_id_seq OWNER TO "HSB";

--
-- Name: catalogoption_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: HSB
--

ALTER SEQUENCE public.catalogoption_id_seq OWNED BY public.catalogoption.id;


--
-- Name: hsbasset; Type: TABLE; Schema: public; Owner: HSB
--

CREATE TABLE public.hsbasset (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    details json NOT NULL,
    "purchaseDate" date NOT NULL
);


ALTER TABLE public.hsbasset OWNER TO "HSB";

--
-- Name: hsbasset_id_seq; Type: SEQUENCE; Schema: public; Owner: HSB
--

CREATE SEQUENCE public.hsbasset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hsbasset_id_seq OWNER TO "HSB";

--
-- Name: hsbasset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: HSB
--

ALTER SEQUENCE public.hsbasset_id_seq OWNED BY public.hsbasset.id;


--
-- Name: hsbuser; Type: TABLE; Schema: public; Owner: HSB
--

CREATE TABLE public.hsbuser (
    id character varying(10) NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    details json,
    active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.hsbuser OWNER TO "HSB";

--
-- Name: catalog id; Type: DEFAULT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.catalog ALTER COLUMN id SET DEFAULT nextval('public.catalog_id_seq'::regclass);


--
-- Name: catalogoption id; Type: DEFAULT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.catalogoption ALTER COLUMN id SET DEFAULT nextval('public.catalogoption_id_seq'::regclass);


--
-- Name: hsbasset id; Type: DEFAULT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.hsbasset ALTER COLUMN id SET DEFAULT nextval('public.hsbasset_id_seq'::regclass);


--
-- Data for Name: catalog; Type: TABLE DATA; Schema: public; Owner: HSB
--

COPY public.catalog (id, "catalogName") FROM stdin;
4	Asset Type
5	Brands
\.


--
-- Data for Name: catalogoption; Type: TABLE DATA; Schema: public; Owner: HSB
--

COPY public.catalogoption (id, "catalogDetail", "catalogId") FROM stdin;
14	detail 55	4
16	samsung	5
17	16	5
18	Asus	5
19	hola	5
20	nvidia	5
21	Sonny	5
\.


--
-- Data for Name: hsbasset; Type: TABLE DATA; Schema: public; Owner: HSB
--

COPY public.hsbasset (id, name, details, "purchaseDate") FROM stdin;
21	Hola	{"assetType":"ElectronicEquipment","responsible":"1728548544","supplier":"gato","value":1000,"depreciationTime":0,"residualValue":100,"annualDepreciation":0,"monthlyDepreciation":0,"valueBooks":0,"observation":"no hay observaciones","insured":0,"active":"almost used","brand":"hola"}	2023-07-26
11	Asus	{"responsible":"David","supplier":"Samsung","value":125.5,"depreciationTime":60,"residualValue":10,"monthlyDepreciation":5.25,"valueBooks":12.5,"annualDepreciation":12.25,"observation":"no hay observacion","insured":3000,"active":"obsoleted discarded","assetType":"FurnitureAndFixtures","brand":"samsung"}	2020-11-16
13	Telefono	{"assetType":"FurnitureAndFixtures","responsible":"1728548544","supplier":"Asus","value":1000,"depreciationTime":60,"residualValue":100,"annualDepreciation":180,"monthlyDepreciation":15,"valueBooks":1000,"observation":"nuevo","insured":3000,"active":"new","brand":"16"}	2023-07-23
14	Computadora	{"assetType":"FurnitureAndFixtures","responsible":"1728548544","supplier":"Asus","value":1000,"depreciationTime":60,"residualValue":100,"annualDepreciation":180,"monthlyDepreciation":15,"valueBooks":1000,"observation":"usado","insured":3000,"active":"used","brand":"16"}	2023-07-23
15	Teclado	{"assetType":"FurnitureAndFixtures","responsible":"1728548544","supplier":"Asus","value":1000,"depreciationTime":60,"residualValue":100,"annualDepreciation":180,"monthlyDepreciation":15,"valueBooks":370,"observation":"usado","insured":3000,"active":"used","brand":"16"}	2020-01-27
16	Monitor	{"assetType":"FurnitureAndFixtures","responsible":"1728548544","supplier":"Asus","value":1000,"depreciationTime":60,"residualValue":100,"annualDepreciation":180,"monthlyDepreciation":15,"valueBooks":370,"observation":"usado","insured":3000,"active":"used","brand":"16"}	2020-01-27
17	Mesa	{"assetType":"FurnitureAndFixtures","responsible":"1728548544","supplier":"Asus","value":1000,"depreciationTime":60,"residualValue":100,"annualDepreciation":180,"monthlyDepreciation":15,"valueBooks":370,"observation":"usado","insured":3000,"active":"used","brand":"16"}	2020-01-27
19	Asus	{"responsible":"David","supplier":"Samsung","value":125.5,"depreciationTime":60,"residualValue":10,"monthlyDepreciation":5.25,"valueBooks":12.5,"annualDepreciation":12.25,"observation":"no hay observacion","insured":3000,"active":"obsoleted discarded","assetType":"Expenses","brand":"samsung"}	2020-11-16
20	Prueba	{"assetType":"ElectronicEquipment","responsible":"1728548544","supplier":"dsadsadsa","value":1000,"depreciationTime":60,"residualValue":100,"annualDepreciation":180,"monthlyDepreciation":15,"valueBooks":1000,"observation":"algo usado","insured":3000,"active":"used","brand":"Asus"}	2023-07-20
12	Asus	{"responsible":"David","supplier":"Samsung","value":125.5,"depreciationTime":60,"residualValue":12.55,"monthlyDepreciation":1.93,"valueBooks":61.81,"annualDepreciation":23.1,"observation":"no hay observacion","insured":3000,"active":"obsoleted discarded","assetType":"Expenses","brand":"nvidia"}	2020-11-16
22	Algo	{"assetType":"ElectronicEquipment","responsible":"1728548544","supplier":"gato","value":1000,"depreciationTime":0,"residualValue":100,"annualDepreciation":0,"monthlyDepreciation":0,"valueBooks":0,"observation":"no hay observaciones","insured":0,"active":"almost used","brand":"nvidia"}	2023-07-26
23	Dssadas	{"assetType":"ElectronicEquipment","responsible":"1728548544","supplier":"gato","value":1000,"depreciationTime":0,"residualValue":100,"annualDepreciation":0,"monthlyDepreciation":0,"valueBooks":0,"observation":"algo usado","insured":0,"active":"used","brand":"nvidia"}	2023-07-26
24	Xd	{"assetType":"ElectronicEquipment","responsible":"1728548544","supplier":"hola","value":1000,"depreciationTime":60,"residualValue":100,"annualDepreciation":180,"monthlyDepreciation":15,"valueBooks":985,"observation":"dsadsasa","insured":3000,"active":"almost used","brand":"Asus"}	2023-07-19
18	Asus	{"responsible":"David","supplier":"Samsung","value":125.5,"depreciationTime":60,"residualValue":12.55,"monthlyDepreciation":1.93,"valueBooks":61.81,"annualDepreciation":23.1,"observation":"no hay observacion","insured":3000,"active":"obsoleted discarded","assetType":"Expenses","brand":"hp"}	2020-11-16
25	Tele	{"assetType":"Expenses","responsible":"1728548544","supplier":"sonny","value":200,"depreciationTime":0,"residualValue":20,"annualDepreciation":0,"monthlyDepreciation":0,"valueBooks":0,"observation":"hola como estas ","insured":0,"active":"new","brand":"Sonny"}	2023-07-26
26	Asus	{"assetType":"FurnitureAndFixtures","model":"asus","serialNumber":1234567890,"responsible":"David","supplier":"Samsung","value":125.5,"depreciationTime":60,"residualValue":10,"annualDepreciation":10.25,"monthlyDepreciation":5.25,"valueBooks":12.5,"observation":"no hay observacion","insured":3000,"active":"obsoleted discarded","brand":"Asus"}	2020-11-16
27	Hp	{"assetType":"ElectronicEquipment","serialNumber":"12345gfdt","model":"hp","color":"azul","responsible":"1727085183","supplier":"Hp","value":1230,"depreciationTime":60,"residualValue":123,"annualDepreciation":221.4,"monthlyDepreciation":18.45,"valueBooks":1137.75,"observation":"semi usado","insured":120,"active":"obsoleted donated","brand":"Sonny"}	2023-04-04
\.


--
-- Data for Name: hsbuser; Type: TABLE DATA; Schema: public; Owner: HSB
--

COPY public.hsbuser (id, name, email, password, details, active) FROM stdin;
1728548544	David	david@david.com	$2b$08$YLyASCMtADUBlxmBKB6HJeRXx4h1LGotNFFtDOuRnfIdjHIB51nH2	{"lastname":"Castro","phone":"0979301325"}	t
1751864008	Issis	issis@issis.com	$2b$08$p0dUr4Xis16WeD.UiqPqOeQEkYa9mK78SQ6HHGDdwnttCeEM15/16	{"lastname":"Ramos","secondname":"Stephania","secondlastname":"Llivisupa","phone":"0990395945"}	t
1707079982	Wladimir	wladimir@wladimir.com	$2b$08$XQFKtUKKKTf59V/6.OpHkex10KFX6lZUnmuzne5ZpdlwypoixOzpi	{"lastname":"Castro","secondname":"Yanovitch","secondlastname":"Valladares","phone":"0979301325"}	t
1727085183	Karina	karina_skarleth@outlook.com	$2b$08$ErnTO8wIzNqCkPu8.qdFyOGR24P9aX/Phl7rSxe0MII60GYhgohsG	{"lastname":"Ramos","secondname":"Skarleth","secondlastname":"Llivisupa","phone":"0979301325"}	t
1711235448	Gladys	gla@gla.com	$2b$08$bE.h4KWv1pj6nxdnhuqZHOdypnfQ.F2leUwYzQeyTdiifCSsNlMk2	{"lastname":"Vera","secondname":"Jeaneth","secondlastname":"Medina","phone":"0983030857"}	t
\.


--
-- Name: catalog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: HSB
--

SELECT pg_catalog.setval('public.catalog_id_seq', 5, true);


--
-- Name: catalogoption_id_seq; Type: SEQUENCE SET; Schema: public; Owner: HSB
--

SELECT pg_catalog.setval('public.catalogoption_id_seq', 21, true);


--
-- Name: hsbasset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: HSB
--

SELECT pg_catalog.setval('public.hsbasset_id_seq', 27, true);


--
-- Name: catalogoption PK_72799c45f8782d450d6bd1dc02c; Type: CONSTRAINT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.catalogoption
    ADD CONSTRAINT "PK_72799c45f8782d450d6bd1dc02c" PRIMARY KEY (id);


--
-- Name: catalog PK_782754bded12b4e75ad4afff913; Type: CONSTRAINT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT "PK_782754bded12b4e75ad4afff913" PRIMARY KEY (id);


--
-- Name: hsbasset PK_c6372c8d0c6d50589c2ba135a52; Type: CONSTRAINT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.hsbasset
    ADD CONSTRAINT "PK_c6372c8d0c6d50589c2ba135a52" PRIMARY KEY (id);


--
-- Name: hsbuser PK_f5f672cb7ba5f03285e2687f4fb; Type: CONSTRAINT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.hsbuser
    ADD CONSTRAINT "PK_f5f672cb7ba5f03285e2687f4fb" PRIMARY KEY (id);


--
-- Name: hsbuser UQ_0318b890910e52cddf5393e04fe; Type: CONSTRAINT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.hsbuser
    ADD CONSTRAINT "UQ_0318b890910e52cddf5393e04fe" UNIQUE (email);


--
-- Name: catalog UQ_a53d6b48fb06d6482c61339b426; Type: CONSTRAINT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.catalog
    ADD CONSTRAINT "UQ_a53d6b48fb06d6482c61339b426" UNIQUE ("catalogName");


--
-- Name: catalogoption FK_a6ab12a51054de2e00ca2128c00; Type: FK CONSTRAINT; Schema: public; Owner: HSB
--

ALTER TABLE ONLY public.catalogoption
    ADD CONSTRAINT "FK_a6ab12a51054de2e00ca2128c00" FOREIGN KEY ("catalogId") REFERENCES public.catalog(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

