import time

import numpy as np
import pandas as pd

BASE_PATH = "./data/"
CITY_DATA = {
    "chicago": "chicago.csv",
    "new york city": "new_york_city.csv",
    "washington": "washington.csv",
}

CITIES = CITY_DATA.keys()
MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'all']
DAYS = ['monday', 'tuesday', 'wednesday', 'thursday',
        'friday', 'saturday', 'sunday', 'all']


def format_propositions(l):
    return "".join([f'- {el}\n' for el in l])


def format_value(l):
    return "".join([f'- {k} : {v}\n' for k, v in l])


def get_filters():
    """
    Asks user to specify a city, month, and day to analyze.
    Returns:
        (str) city - name of the city to analyze
        (str) month - name of the month to filter by, or "all" to apply no month filter
        (str) day - name of the day of week to filter by, or "all" to apply no day filter
    """
    city = month = day = ""

    print("Hello! Let's explore some bikeshare data!")
    # TO DO: Get user input for city (chicago, new york city, washington)
    # HINT: Use a while loop to handle invalid inputs
    while city not in CITIES:
        city = input(
            f"\nWhich city would you like to analyze?\n{format_propositions(CITIES)}\n")

    # TO DO: get user input for month (all, january, february, ... , june)
    while month not in MONTHS:
        month = input(
            f"\nWhich month would you like to analyze?\n{format_propositions(MONTHS)}\n")

    # TO DO: get user input for day of week (all, monday, tuesday, ... sunday)
    while day not in DAYS:
        day = input(
            f"\nWhich day of the week would you like to analyze?\n{format_propositions(DAYS)}\n")

    print("-" * 40)
    return city, month, day


def load_data(city, month, day):
    """
    Loads data for the specified city and filters by month and day if applicable.
    Args:
        (str) city - name of the city to analyze
        (str) month - name of the month to filter by, or "all" to apply no month filter
        (str) day - name of the day of week to filter by, or "all" to apply no day filter
    Returns:
        df - Pandas DataFrame containing city data filtered by month and day
    """
    df = pd.read_csv(f"{BASE_PATH}{CITY_DATA[city]}", parse_dates=[
                     'Start Time', 'End Time'])

    if month != 'all':
        df = df.loc[df['Start Time'].dt.month_name() == month.capitalize()]

    if day != 'all':
        df = df.loc[df['Start Time'].dt.day_name() == day.capitalize()]

    return df


def time_stats(df):
    """Displays statistics on the most frequent times of travel."""

    print("\nCalculating The Most Frequent Times of Travel...\n")
    start_time = time.time()

    # Pandas Series has mode function to get the most frequent value
    # https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.mode.html

    # TO DO: Display the most common month
    most_common_month = df['Start Time'].dt.month_name(
    ).mode().to_string(index=False)
    print(f"The most common month is {most_common_month}")

    # TO DO: Display the most common day of week
    most_common_day = df['Start Time'].dt.day_name(
    ).mode().to_string(index=False)
    print(f"The most common day of the week is {most_common_day}")

    # TO DO: Display the most common start hour
    most_common_hour = df['Start Time'].dt.hour.mode().to_string(index=False)
    print(f"The most common start hour is {most_common_hour}h")

    print("\nThis took %s seconds." % (time.time() - start_time))
    print("-" * 40)


def station_stats(df):
    """Displays statistics on the most popular stations and trip."""

    print("\nCalculating The Most Popular Stations and Trip...\n")
    start_time = time.time()

    # Pandas Series has mode function to get the most frequent value
    # https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.Series.mode.html

    # TO DO: Display most commonly used start station
    most_common_start_station = df['Start Station'].mode(
    ).to_string(index=False)
    print(
        f"The most commonly used start station is {most_common_start_station}")

    # TO DO: Display most commonly used end station
    most_common_end_station = df['End Station'].mode().to_string(index=False)
    print(f"The most commonly used end station is {most_common_end_station}")

    # TO DO: Display most frequent combination of start station and end station trip
    most_common_trip = df.groupby(
        ['Start Station', 'End Station']).size().idxmax()
    most_common_trip_start_station, most_common_trip_end_station = most_common_trip
    print(
        f"The most frequent combination of start station and end station trip is \n Start : {most_common_trip_start_station}\n End : {most_common_trip_end_station}")

    print("\nThis took %s seconds." % (time.time() - start_time))
    print("-" * 40)


def trip_duration_stats(df):
    """Displays statistics on the total and average trip duration."""

    print("\nCalculating Trip Duration...\n")
    start_time = time.time()

    # TO DO: Display total travel time
    total_travel_time = df['Trip Duration'].sum()
    travel_time_in_minutes = total_travel_time / 60
    travel_time_in_hours = travel_time_in_minutes / 60
    travel_time_in_days = travel_time_in_hours / 24
    print(
        f"""
The total travel time is :
- {total_travel_time} seconds
- {int(travel_time_in_minutes)} minutes
- {int(travel_time_in_hours)} hours
- {int(travel_time_in_days)} days
"""
    )

    # TO DO: Display mean travel time
    mean_travel_time = df['Trip Duration'].mean()
    mean_travel_time_in_minutes = int(mean_travel_time / 60)
    mean_travel_time_in_hours = mean_travel_time_in_minutes / 60
    print(
        f"""
The mean travel time is :
- {mean_travel_time} seconds
- {int(mean_travel_time_in_minutes)} minutes
- {mean_travel_time_in_hours} hours
"""
    )

    print("\nThis took %s seconds." % (time.time() - start_time))
    print("-" * 40)


def user_stats(df):
    """Displays statistics on bikeshare users."""

    print("\nCalculating User Stats...\n")
    start_time = time.time()

    # TO DO: Display counts of user types
    number_of_user_types = df['User Type'].value_counts()
    print(
        f"The number of user types is :\n{format_value(number_of_user_types.items())}")

    # TO DO: Display counts of gender
    number_of_genders = df['Gender'].value_counts()
    print(
        f"The number of genders is :\n{format_value(number_of_genders.items())}")

    # TO DO: Display earliest, most recent, and most common year of birth
    
    # Pandas Series have describe methods who generate descriptive statistics (min, max, etc...)
    # https://pandas.pydata.org/docs/reference/api/pandas.Series.describe.html
    
    birth_data = df['Birth Year'].describe()
    oldest_year = int(birth_data['min'])
    earliest_year = int(birth_data['max'])
    most_common_year = int(df['Birth Year'].mode()[0])
    print(
        f"""
Informations about birth years :
Oldest : {oldest_year}
Earliest : {earliest_year}
Most common : {most_common_year}
"""
    )

    print("\nThis took %s seconds." % (time.time() - start_time))
    print("-" * 40)


def main():
    while True:
        city, month, day = get_filters()
        df = load_data(city, month, day)
        time_stats(df)
        station_stats(df)
        trip_duration_stats(df)
        user_stats(df)

        restart = input("\nWould you like to restart? Enter yes or no.\n")
        if restart.lower() != "yes":
            break


if __name__ == "__main__":
    main()
