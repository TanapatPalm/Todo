PGDMP  ;                    }            todo    17.5    17.5     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388    todo    DATABASE     v   CREATE DATABASE todo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Thai_Thailand.874';
    DROP DATABASE todo;
                     postgres    false            �            1259    16389    todo    TABLE        CREATE TABLE public.todo (
);
    DROP TABLE public.todo;
       public         heap r       postgres    false            �            1259    16393 
   todo_table    TABLE     �   CREATE TABLE public.todo_table (
    todo_id integer NOT NULL,
    todo_desc character varying(255),
    todo_completed boolean DEFAULT false
);
    DROP TABLE public.todo_table;
       public         heap r       postgres    false            �            1259    16392    todo_table_todo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.todo_table_todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.todo_table_todo_id_seq;
       public               postgres    false    219            �           0    0    todo_table_todo_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.todo_table_todo_id_seq OWNED BY public.todo_table.todo_id;
          public               postgres    false    218            %           2604    16396    todo_table todo_id    DEFAULT     x   ALTER TABLE ONLY public.todo_table ALTER COLUMN todo_id SET DEFAULT nextval('public.todo_table_todo_id_seq'::regclass);
 A   ALTER TABLE public.todo_table ALTER COLUMN todo_id DROP DEFAULT;
       public               postgres    false    219    218    219            �          0    16389    todo 
   TABLE DATA              COPY public.todo  FROM stdin;
    public               postgres    false    217   �       �          0    16393 
   todo_table 
   TABLE DATA           H   COPY public.todo_table (todo_id, todo_desc, todo_completed) FROM stdin;
    public               postgres    false    219   �       �           0    0    todo_table_todo_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.todo_table_todo_id_seq', 120, true);
          public               postgres    false    218            (           2606    16399    todo_table todo_table_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.todo_table
    ADD CONSTRAINT todo_table_pkey PRIMARY KEY (todo_id);
 D   ALTER TABLE ONLY public.todo_table DROP CONSTRAINT todo_table_pkey;
       public                 postgres    false    219            �      x������ � �      �      x�342�,JMLQH����L����� >a%     