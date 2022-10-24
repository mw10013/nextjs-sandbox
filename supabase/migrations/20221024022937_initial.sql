create sequence "public"."access_event_access_event_id_seq";

create sequence "public"."access_hub_access_hub_id_seq";

create sequence "public"."access_point_access_point_id_seq";

create sequence "public"."access_user_access_user_id_seq";

create sequence "public"."app_user_app_user_id_seq";

create table "public"."access_event" (
    "access_event_id" integer not null default nextval('access_event_access_event_id_seq'::regclass),
    "at" timestamp with time zone not null,
    "access" text not null,
    "code" text not null,
    "access_user_id" integer,
    "access_point_id" integer not null
);


create table "public"."access_hub" (
    "access_hub_id" integer not null default nextval('access_hub_access_hub_id_seq'::regclass),
    "name" text not null default 'Hub'::text,
    "description" text not null default ''::text,
    "heartbeat_at" timestamp with time zone,
    "api_token" text not null default ''::text,
    "app_user_id" integer not null
);


create table "public"."access_point" (
    "access_point_id" integer not null default nextval('access_point_access_point_id_seq'::regclass),
    "name" text not null,
    "description" text not null default ''::text,
    "position" integer not null,
    "access_hub_id" integer not null
);


create table "public"."access_point_to_access_user" (
    "access_point_id" integer not null,
    "access_user_id" integer not null
);


create table "public"."access_user" (
    "access_user_id" integer not null default nextval('access_user_access_user_id_seq'::regclass),
    "name" text not null,
    "description" text not null default ''::text,
    "code" text not null,
    "activate_code_at" timestamp with time zone,
    "expire_code_at" timestamp with time zone,
    "app_user_id" integer not null
);


create table "public"."app_user" (
    "app_user_id" integer not null default nextval('app_user_app_user_id_seq'::regclass),
    "email" text not null,
    "role" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter sequence "public"."access_event_access_event_id_seq" owned by "public"."access_event"."access_event_id";

alter sequence "public"."access_hub_access_hub_id_seq" owned by "public"."access_hub"."access_hub_id";

alter sequence "public"."access_point_access_point_id_seq" owned by "public"."access_point"."access_point_id";

alter sequence "public"."access_user_access_user_id_seq" owned by "public"."access_user"."access_user_id";

alter sequence "public"."app_user_app_user_id_seq" owned by "public"."app_user"."app_user_id";

CREATE INDEX access_event_access_point_id_idx ON public.access_event USING btree (access_point_id);

CREATE INDEX access_event_access_user_id_idx ON public.access_event USING btree (access_user_id);

CREATE UNIQUE INDEX access_event_pkey ON public.access_event USING btree (access_event_id);

CREATE INDEX access_hub_app_user_id_idx ON public.access_hub USING btree (app_user_id);

CREATE UNIQUE INDEX access_hub_pkey ON public.access_hub USING btree (access_hub_id);

CREATE INDEX access_point_access_hub_id_idx ON public.access_point USING btree (access_hub_id);

CREATE UNIQUE INDEX access_point_access_hub_id_position_key ON public.access_point USING btree (access_hub_id, "position");

CREATE UNIQUE INDEX access_point_pkey ON public.access_point USING btree (access_point_id);

CREATE UNIQUE INDEX access_point_to_access_user_access_point_id_access_user_id_key ON public.access_point_to_access_user USING btree (access_point_id, access_user_id);

CREATE INDEX access_point_to_access_user_access_point_id_idx ON public.access_point_to_access_user USING btree (access_point_id);

CREATE INDEX access_point_to_access_user_access_user_id_idx ON public.access_point_to_access_user USING btree (access_user_id);

CREATE UNIQUE INDEX access_user_app_user_id_code_key ON public.access_user USING btree (app_user_id, code);

CREATE INDEX access_user_app_user_id_idx ON public.access_user USING btree (app_user_id);

CREATE UNIQUE INDEX access_user_app_user_id_name_key ON public.access_user USING btree (app_user_id, name);

CREATE UNIQUE INDEX access_user_pkey ON public.access_user USING btree (access_user_id);

CREATE UNIQUE INDEX app_user_email_key ON public.app_user USING btree (email);

CREATE UNIQUE INDEX app_user_pkey ON public.app_user USING btree (app_user_id);

alter table "public"."access_event" add constraint "access_event_pkey" PRIMARY KEY using index "access_event_pkey";

alter table "public"."access_hub" add constraint "access_hub_pkey" PRIMARY KEY using index "access_hub_pkey";

alter table "public"."access_point" add constraint "access_point_pkey" PRIMARY KEY using index "access_point_pkey";

alter table "public"."access_user" add constraint "access_user_pkey" PRIMARY KEY using index "access_user_pkey";

alter table "public"."app_user" add constraint "app_user_pkey" PRIMARY KEY using index "app_user_pkey";

alter table "public"."access_event" add constraint "access_event_access_check" CHECK (((access = 'grant'::text) OR (access = 'deny'::text))) not valid;

alter table "public"."access_event" validate constraint "access_event_access_check";

alter table "public"."access_event" add constraint "access_event_access_point_id_fkey" FOREIGN KEY (access_point_id) REFERENCES access_point(access_point_id) ON DELETE CASCADE not valid;

alter table "public"."access_event" validate constraint "access_event_access_point_id_fkey";

alter table "public"."access_event" add constraint "access_event_access_user_id_fkey" FOREIGN KEY (access_user_id) REFERENCES access_user(access_user_id) ON DELETE CASCADE not valid;

alter table "public"."access_event" validate constraint "access_event_access_user_id_fkey";

alter table "public"."access_hub" add constraint "access_hub_app_user_id_fkey" FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id) ON DELETE CASCADE not valid;

alter table "public"."access_hub" validate constraint "access_hub_app_user_id_fkey";

alter table "public"."access_hub" add constraint "access_hub_name_check" CHECK ((name <> ''::text)) not valid;

alter table "public"."access_hub" validate constraint "access_hub_name_check";

alter table "public"."access_point" add constraint "access_point_access_hub_id_fkey" FOREIGN KEY (access_hub_id) REFERENCES access_hub(access_hub_id) ON DELETE CASCADE not valid;

alter table "public"."access_point" validate constraint "access_point_access_hub_id_fkey";

alter table "public"."access_point" add constraint "access_point_access_hub_id_position_key" UNIQUE using index "access_point_access_hub_id_position_key";

alter table "public"."access_point" add constraint "access_point_name_check" CHECK ((name <> ''::text)) not valid;

alter table "public"."access_point" validate constraint "access_point_name_check";

alter table "public"."access_point" add constraint "access_point_position_check" CHECK (("position" > 0)) not valid;

alter table "public"."access_point" validate constraint "access_point_position_check";

alter table "public"."access_point_to_access_user" add constraint "access_point_to_access_user_access_point_id_access_user_id_key" UNIQUE using index "access_point_to_access_user_access_point_id_access_user_id_key";

alter table "public"."access_point_to_access_user" add constraint "access_point_to_access_user_access_point_id_fkey" FOREIGN KEY (access_point_id) REFERENCES access_point(access_point_id) ON DELETE CASCADE not valid;

alter table "public"."access_point_to_access_user" validate constraint "access_point_to_access_user_access_point_id_fkey";

alter table "public"."access_point_to_access_user" add constraint "access_point_to_access_user_access_user_id_fkey" FOREIGN KEY (access_user_id) REFERENCES access_user(access_user_id) ON DELETE CASCADE not valid;

alter table "public"."access_point_to_access_user" validate constraint "access_point_to_access_user_access_user_id_fkey";

alter table "public"."access_user" add constraint "access_user_app_user_id_code_key" UNIQUE using index "access_user_app_user_id_code_key";

alter table "public"."access_user" add constraint "access_user_app_user_id_fkey" FOREIGN KEY (app_user_id) REFERENCES app_user(app_user_id) ON DELETE CASCADE not valid;

alter table "public"."access_user" validate constraint "access_user_app_user_id_fkey";

alter table "public"."access_user" add constraint "access_user_app_user_id_name_key" UNIQUE using index "access_user_app_user_id_name_key";

alter table "public"."access_user" add constraint "access_user_code_check" CHECK ((code <> ''::text)) not valid;

alter table "public"."access_user" validate constraint "access_user_code_check";

alter table "public"."access_user" add constraint "access_user_name_check" CHECK ((name <> ''::text)) not valid;

alter table "public"."access_user" validate constraint "access_user_name_check";

alter table "public"."app_user" add constraint "app_user_email_check" CHECK ((email <> ''::text)) not valid;

alter table "public"."app_user" validate constraint "app_user_email_check";

alter table "public"."app_user" add constraint "app_user_email_key" UNIQUE using index "app_user_email_key";

alter table "public"."app_user" add constraint "app_user_role_check" CHECK (((role = 'customer'::text) OR (role = 'admin'::text))) not valid;

alter table "public"."app_user" validate constraint "app_user_role_check";


