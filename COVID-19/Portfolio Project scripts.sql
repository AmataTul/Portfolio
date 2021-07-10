select*
from PortfolioProject..CovidDeaths
where continent is not null
order by 3,4

-- Select Data that we're going to be using

select Location, date, total_cases, new_cases, total_deaths, population
from PortfolioProject..CovidDeaths
where continent is not null
order by 1,2


-- Total Cases vs Total Deaths
-- Likelihood of dying if you contract covid in your country

select Location, date, total_cases, total_deaths, (total_deaths/total_cases)*100 as PercentPopulationInfected
from PortfolioProject..CovidDeaths 
where location like '%state%' and continent is not null
order by 1,2

-- Total Cases vs Population
-- Percentage of the population infected with Covid

select Location, date, Population, total_cases, (total_cases/population)*100 as PercentPopulationInfected
from PortfolioProject..CovidDeaths 
where location like '%state%'
order by 1,2 

-- Countries with Highest Infection Rate compared to Population
select Location, Population, Max(total_cases), Max((total_cases/population))*100 as PercentPopulationInfected
from PortfolioProject..CovidDeaths 
-- where location like '%state%'
group by Location, Population
order by PercentPopulationInfected desc



-- Countries with Highest Death Count per Population
select Location, Max(cast(Total_deaths as int)) as TotalDeathCount
from PortfolioProject..CovidDeaths 
-- where location like '%state%'
where continent is not null
group by Location
order by TotalDeathCount desc


-- Continents with Highest Death Count per Population
select continent, Max(cast(Total_deaths as int)) as TotalDeathCount
from PortfolioProject..CovidDeaths 
-- where location like '%state%'
where continent is not null
group by continent
order by TotalDeathCount desc

-- Global Numbers

Select SUM(new_cases) as total_cases, SUM(cast(new_deaths as int)) as total_deaths, 
SUM(cast(new_deaths as int))/SUM(New_Cases)*100 as DeathPercentage
From PortfolioProject..CovidDeaths
--Where location like '%states%'
where continent is not null 
order by 1,2

-- Total Population vs Vaccinations
-- Percentage of Population that has recieved at least one Covid Vaccine

With PopvsVac (Continent, Location, Date, Population, New_Vaccinations, RollingPeopleVaccinated)
as
(
Select dea.continent, dea.location, dea.date, dea.population, vac.new_vaccinations
, SUM(CONVERT(int,vac.new_vaccinations)) OVER (Partition by dea.Location Order by dea.location, dea.Date) as RollingPeopleVaccinated
--, (RollingPeopleVaccinated/population)*100
From PortfolioProject..CovidDeaths dea
Join PortfolioProject..CovidVaccinations vac
	On dea.location = vac.location
	and dea.date = vac.date
where dea.continent is not null 
--order by 2,3
)
Select *, (RollingPeopleVaccinated/Population)*100
From PopvsVac


-- Using Temp Table to perform Calculation on Partition By in previous query
DROP Table if exists #PercentPopulationVaccinated
Create Table #PercentPopulationVaccinated
(
Continent nvarchar(255),
Location nvarchar(255),
Date datetime,
Population numeric,
New_vaccinations numeric,
RollingpeopleVaccinated numeric
)

Insert into #PercentPopulationVaccinated
Select dea.continent, dea.location, dea.date, dea.population, vac.new_vaccinations
, SUM(CONVERT(int,vac.new_vaccinations)) OVER (Partition by dea.Location Order by dea.location, dea.Date) as RollingPeopleVaccinated

From PortfolioProject..CovidDeaths dea
Join PortfolioProject..CovidVaccinations vac
	On dea.location = vac.location
	and dea.date = vac.date
--where dea.continent is not null 
--order by 2,3

Select *, (RollingPeopleVaccinated/Population)*100
From #PercentPopulationVaccinated


-- Create View to store data for later visualizations
Create View PercentPopulationVaccinated as
Select dea.continent, dea.location, dea.date, dea.population, vac.new_vaccinations
, SUM(CONVERT(int,vac.new_vaccinations)) OVER (Partition by dea.Location Order by dea.location, dea.Date) as RollingPeopleVaccinated
--, (RollingPeopleVaccinated/population)*100
From PortfolioProject..CovidDeaths dea
Join PortfolioProject..CovidVaccinations vac
	On dea.location = vac.location
	and dea.date = vac.date
where dea.continent is not null


Select*from PercentPopulationVaccinated
