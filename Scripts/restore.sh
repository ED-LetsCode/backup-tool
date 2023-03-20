#######################################################################################################################################
####           ____                                                                                                                ####
####          /---.'.__             ____//       尺🝗丂〸ㄖ尺🝗  乃闩⼕长ㄩ尸-丂⼕尺讠尸〸 by Eray                                     ####
####               '--.\           /.---'                                                                                          ####
####          _______  \\         //                                                                                               ####
####        /.------.\  \|      .'/  ______                                                                                        ####
####       //  ___  \ \ ||/|\  //  _/_----.\__   Please read the script before executing                                           ####
####      |/  /.-.\  \ \:|< >|// _/.'..\   '--'                                                                                    ####
####         //   \'. | \'.|.'/ /_/ /  \\        This script only restores the project                                             ####
####        //     \ \_\/" ' ~\-'.-'    \\                                                                                         ####
####       //       '-._| :H: |'-.__     \\                                                                                        ####
####      //           (/'==='\)'-._\     ||                                                                                       ####
####     ||                        \\    \|      !!!!!!!!!!!! IMPORTANT !!!!!!!!!!!!                                               ####
####      ||                         \\    '     Be careful if you enter a wrong path you can delete important files               ####
####      |/                          \\                                                                                           ####
####                                   ||                                                                                          ####
####                                   ||                                                                                          ####
####                                   \\                                                                                          ####
####                                    '                                                                                          ####
#######################################################################################################################################

################# Fill this variables #######################
# !!!! DON'T FORGET TO ADD THE BACKSLASH AT THE END OF THE PATH !!!!
# !!!! YOU CAN DELETE THE WHOLE PROJECTS FOLDER !!!!

# Path to the BackupFolder
pathToTheBackupFolder=""

# Path to the project
pathToTheProject=""

############################################################

# Get the backupName from the first parameter
backupName="$1"

# Check if the backupName is empty
if [ -z "$backupName" ]; then
    echo "error: Backup name is missing"
    exit 1
fi

# Concat the path to the backup folder and the backup name
pathToTheBackup="$pathToTheBackupFolder$backupName"

# Check if the backup exists
if [ ! -f "$pathToTheBackup" ]; then
    echo "error: Backup does not exist"
    exit 1
fi

# Delete all files in the Project folder | DON'T PUT A SPACE BETWEEN pathToTheProject and the STAR !!! 
# !!! YOU CAN DELETE THE IMPORTANT FOLDERS ON THE SERVER !!!
rm -rf "$pathToTheProject"*

# Unzip the backup to the project folder | > /dev/null is to no display the output of unzip
unzip "$pathToTheBackup" -d "$pathToTheProject" > /dev/null

echo "Backup was restored successfully"