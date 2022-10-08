begin;

create table factbook
(
year int,
date date,
shares text,
trades text,
dollars text
);

\copy factbook from 'factbook.csv' with delimiter E'\t' null ''

alter table factbook
alter shares
type bigint
using replace(shares, ',', '')::bigint,

alter trades
type bigint
using replace(trades, ',', '')::bigint,

alter dollars
type bigint
using substring(replace(dollars, ',', '') from 2)::numeric;

commit;

\set start '2017-02-01'

select date,
to_char(shares, '99G999G999G999') as shares,
to_char(trades, '99G999G999') as trades,
to_char(dollars, 'L99G999G999G999') as dollars
from factbook
where date >= date :'start'
and date < date :'start' + interval '1 month'
order by date;