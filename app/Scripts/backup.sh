workingDirectory=pwd

# Max amount of backup files in the folder
maxAmountOfBackups=10

# Count the amount of Backups
amountOfBackups=$(ls | wc -l)

# -2 because there are 2 files that are not Backups ./backup.sh ./restore.sh
amountOfBackups=$((amountOfBackups - 2))

# If the number of files exceeds the maxAmountOfBackups, delete the oldest file
if [ $amountOfBackups -gt $maxAmountOfBackups ]; then

    # Get the oldest file in the current directory, excluding restore.sh and backup.sh
    oldestFile=$(ls -1t | grep -v -E 'restore\.sh|backup\.sh' | tail -1)

    # Delete the oldest file
    rm -f "$oldestFile"
fi


fileName=$(date +'%Y-%m-%d-%a-%Hh-%Mm-%Ss-Backup.txt')

touch "$fileName"
