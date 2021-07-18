/*
Queries used for Power BI Project
*/

-- create a temporary table
with hotels as (
select * from dbo.['2018$']
union
select * from dbo.['2019$']
union
select * from dbo.['2020$'])


/* ANALYSIS
Create a new column for revenue build per year

select 
arrival_date_year,
hotel,
round(sum((stays_in_week_nights + stays_in_weekend_nights)*adr),2) as revenue
from hotels
group by arrival_date_year, hotel
*/

-- join other tables
select*from hotels
left join dbo.market_segment$ on hotels.market_segment = market_segment$.market_segment
left join dbo.meal_cost$ on meal_cost$.meal = hotels.meal