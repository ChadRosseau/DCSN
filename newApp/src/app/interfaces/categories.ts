/* 
Defines all current categories and subcategories. 
Subcategories are assigned to categories in the database, 
and are imported through the sharedData service.
*/

export enum Category {
    Economy = "Economy",
    Poverty = "Poverty",
    Sustainability = "Sustainability",
    Politics = "Politics"
}

export enum Subcategory {
    Consumption = 'Responsible Consumption',
    Work = 'Decent Work',
    Industry = 'Industry & Innovation',
    Wealth = 'Wealth Inequality',
    Hunger = 'Hunger',
    Health = 'Health & Wellbeing',
    Education = 'Education',
    Sanitation = 'Clean Water & Sanitation',
    Energy = 'Clean Energy',
    Climate = 'Climate Action',
    Land = 'Life On Land',
    Water = 'Life Below Water',
    Cities = 'Sustainable Cities',
    Peace = 'Peace & Justice',
    Gender = 'Gender Equality',
    Partnerships = 'Partnerships'
}