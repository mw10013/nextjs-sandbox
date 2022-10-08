create sequence "public"."album_albumid_seq";

create sequence "public"."artist_artistid_seq";

create sequence "public"."customer_customerid_seq";

create sequence "public"."employee_employeeid_seq";

create sequence "public"."genre_genreid_seq";

create sequence "public"."invoice_invoiceid_seq";

create sequence "public"."invoiceline_invoicelineid_seq";

create sequence "public"."mediatype_mediatypeid_seq";

create sequence "public"."playlist_playlistid_seq";

create sequence "public"."track_trackid_seq";

create table "public"."album" (
    "albumid" bigint not null default nextval('album_albumid_seq'::regclass),
    "title" text,
    "artistid" bigint
);


create table "public"."artist" (
    "artistid" bigint not null default nextval('artist_artistid_seq'::regclass),
    "name" text
);


create table "public"."customer" (
    "customerid" bigint not null default nextval('customer_customerid_seq'::regclass),
    "firstname" text,
    "lastname" text,
    "company" text,
    "address" text,
    "city" text,
    "state" text,
    "country" text,
    "postalcode" text,
    "phone" text,
    "fax" text,
    "email" text,
    "supportrepid" bigint
);


create table "public"."employee" (
    "employeeid" bigint not null default nextval('employee_employeeid_seq'::regclass),
    "lastname" text,
    "firstname" text,
    "title" text,
    "reportsto" bigint,
    "birthdate" timestamp with time zone,
    "hiredate" timestamp with time zone,
    "address" text,
    "city" text,
    "state" text,
    "country" text,
    "postalcode" text,
    "phone" text,
    "fax" text,
    "email" text
);


create table "public"."genre" (
    "genreid" bigint not null default nextval('genre_genreid_seq'::regclass),
    "name" text
);


create table "public"."invoice" (
    "invoiceid" bigint not null default nextval('invoice_invoiceid_seq'::regclass),
    "customerid" bigint,
    "invoicedate" timestamp with time zone,
    "billingaddress" text,
    "billingcity" text,
    "billingstate" text,
    "billingcountry" text,
    "billingpostalcode" text,
    "total" numeric(10,2)
);


create table "public"."invoiceline" (
    "invoicelineid" bigint not null default nextval('invoiceline_invoicelineid_seq'::regclass),
    "invoiceid" bigint,
    "trackid" bigint,
    "unitprice" numeric(10,2),
    "quantity" bigint
);


create table "public"."mediatype" (
    "mediatypeid" bigint not null default nextval('mediatype_mediatypeid_seq'::regclass),
    "name" text
);


create table "public"."playlist" (
    "playlistid" bigint not null default nextval('playlist_playlistid_seq'::regclass),
    "name" text
);


create table "public"."playlisttrack" (
    "playlistid" bigint not null,
    "trackid" bigint not null
);


create table "public"."track" (
    "trackid" bigint not null default nextval('track_trackid_seq'::regclass),
    "name" text,
    "albumid" bigint,
    "mediatypeid" bigint,
    "genreid" bigint,
    "composer" text,
    "milliseconds" bigint,
    "bytes" bigint,
    "unitprice" numeric(10,2)
);


alter sequence "public"."album_albumid_seq" owned by "public"."album"."albumid";

alter sequence "public"."artist_artistid_seq" owned by "public"."artist"."artistid";

alter sequence "public"."customer_customerid_seq" owned by "public"."customer"."customerid";

alter sequence "public"."employee_employeeid_seq" owned by "public"."employee"."employeeid";

alter sequence "public"."genre_genreid_seq" owned by "public"."genre"."genreid";

alter sequence "public"."invoice_invoiceid_seq" owned by "public"."invoice"."invoiceid";

alter sequence "public"."invoiceline_invoicelineid_seq" owned by "public"."invoiceline"."invoicelineid";

alter sequence "public"."mediatype_mediatypeid_seq" owned by "public"."mediatype"."mediatypeid";

alter sequence "public"."playlist_playlistid_seq" owned by "public"."playlist"."playlistid";

alter sequence "public"."track_trackid_seq" owned by "public"."track"."trackid";

CREATE UNIQUE INDEX idx_16386_album_pkey ON public.album USING btree (albumid);

CREATE INDEX idx_16386_ifk_albumartistid ON public.album USING btree (artistid);

CREATE UNIQUE INDEX idx_16393_artist_pkey ON public.artist USING btree (artistid);

CREATE UNIQUE INDEX idx_16400_customer_pkey ON public.customer USING btree (customerid);

CREATE INDEX idx_16400_ifk_customersupportrepid ON public.customer USING btree (supportrepid);

CREATE UNIQUE INDEX idx_16407_employee_pkey ON public.employee USING btree (employeeid);

CREATE INDEX idx_16407_ifk_employeereportsto ON public.employee USING btree (reportsto);

CREATE UNIQUE INDEX idx_16414_genre_pkey ON public.genre USING btree (genreid);

CREATE INDEX idx_16421_ifk_invoicecustomerid ON public.invoice USING btree (customerid);

CREATE UNIQUE INDEX idx_16421_invoice_pkey ON public.invoice USING btree (invoiceid);

CREATE INDEX idx_16428_ifk_invoicelineinvoiceid ON public.invoiceline USING btree (invoiceid);

CREATE INDEX idx_16428_ifk_invoicelinetrackid ON public.invoiceline USING btree (trackid);

CREATE UNIQUE INDEX idx_16428_invoiceline_pkey ON public.invoiceline USING btree (invoicelineid);

CREATE UNIQUE INDEX idx_16433_mediatype_pkey ON public.mediatype USING btree (mediatypeid);

CREATE UNIQUE INDEX idx_16440_playlist_pkey ON public.playlist USING btree (playlistid);

CREATE INDEX idx_16446_ifk_playlisttracktrackid ON public.playlisttrack USING btree (trackid);

CREATE UNIQUE INDEX idx_16446_playlisttrack_pkey ON public.playlisttrack USING btree (playlistid, trackid);

CREATE UNIQUE INDEX idx_16446_sqlite_autoindex_playlisttrack_1 ON public.playlisttrack USING btree (playlistid, trackid);

CREATE INDEX idx_16450_ifk_trackalbumid ON public.track USING btree (albumid);

CREATE INDEX idx_16450_ifk_trackgenreid ON public.track USING btree (genreid);

CREATE INDEX idx_16450_ifk_trackmediatypeid ON public.track USING btree (mediatypeid);

CREATE UNIQUE INDEX idx_16450_track_pkey ON public.track USING btree (trackid);

alter table "public"."album" add constraint "idx_16386_album_pkey" PRIMARY KEY using index "idx_16386_album_pkey";

alter table "public"."artist" add constraint "idx_16393_artist_pkey" PRIMARY KEY using index "idx_16393_artist_pkey";

alter table "public"."customer" add constraint "idx_16400_customer_pkey" PRIMARY KEY using index "idx_16400_customer_pkey";

alter table "public"."employee" add constraint "idx_16407_employee_pkey" PRIMARY KEY using index "idx_16407_employee_pkey";

alter table "public"."genre" add constraint "idx_16414_genre_pkey" PRIMARY KEY using index "idx_16414_genre_pkey";

alter table "public"."invoice" add constraint "idx_16421_invoice_pkey" PRIMARY KEY using index "idx_16421_invoice_pkey";

alter table "public"."invoiceline" add constraint "idx_16428_invoiceline_pkey" PRIMARY KEY using index "idx_16428_invoiceline_pkey";

alter table "public"."mediatype" add constraint "idx_16433_mediatype_pkey" PRIMARY KEY using index "idx_16433_mediatype_pkey";

alter table "public"."playlist" add constraint "idx_16440_playlist_pkey" PRIMARY KEY using index "idx_16440_playlist_pkey";

alter table "public"."playlisttrack" add constraint "idx_16446_playlisttrack_pkey" PRIMARY KEY using index "idx_16446_playlisttrack_pkey";

alter table "public"."track" add constraint "idx_16450_track_pkey" PRIMARY KEY using index "idx_16450_track_pkey";

alter table "public"."album" add constraint "album_artistid_fkey" FOREIGN KEY (artistid) REFERENCES artist(artistid) not valid;

alter table "public"."album" validate constraint "album_artistid_fkey";

alter table "public"."customer" add constraint "customer_supportrepid_fkey" FOREIGN KEY (supportrepid) REFERENCES employee(employeeid) not valid;

alter table "public"."customer" validate constraint "customer_supportrepid_fkey";

alter table "public"."employee" add constraint "employee_reportsto_fkey" FOREIGN KEY (reportsto) REFERENCES employee(employeeid) not valid;

alter table "public"."employee" validate constraint "employee_reportsto_fkey";

alter table "public"."invoice" add constraint "invoice_customerid_fkey" FOREIGN KEY (customerid) REFERENCES customer(customerid) not valid;

alter table "public"."invoice" validate constraint "invoice_customerid_fkey";

alter table "public"."invoiceline" add constraint "invoiceline_invoiceid_fkey" FOREIGN KEY (invoiceid) REFERENCES invoice(invoiceid) not valid;

alter table "public"."invoiceline" validate constraint "invoiceline_invoiceid_fkey";

alter table "public"."invoiceline" add constraint "invoiceline_trackid_fkey" FOREIGN KEY (trackid) REFERENCES track(trackid) not valid;

alter table "public"."invoiceline" validate constraint "invoiceline_trackid_fkey";

alter table "public"."playlisttrack" add constraint "playlisttrack_playlistid_fkey" FOREIGN KEY (playlistid) REFERENCES playlist(playlistid) not valid;

alter table "public"."playlisttrack" validate constraint "playlisttrack_playlistid_fkey";

alter table "public"."playlisttrack" add constraint "playlisttrack_trackid_fkey" FOREIGN KEY (trackid) REFERENCES track(trackid) not valid;

alter table "public"."playlisttrack" validate constraint "playlisttrack_trackid_fkey";

alter table "public"."track" add constraint "track_albumid_fkey" FOREIGN KEY (albumid) REFERENCES album(albumid) not valid;

alter table "public"."track" validate constraint "track_albumid_fkey";

alter table "public"."track" add constraint "track_genreid_fkey" FOREIGN KEY (genreid) REFERENCES genre(genreid) not valid;

alter table "public"."track" validate constraint "track_genreid_fkey";

alter table "public"."track" add constraint "track_mediatypeid_fkey" FOREIGN KEY (mediatypeid) REFERENCES mediatype(mediatypeid) not valid;

alter table "public"."track" validate constraint "track_mediatypeid_fkey";


