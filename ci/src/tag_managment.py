import argparse
from datetime import datetime

def are_every_information_been_set(message_title:str,
                                   first_line:str,
                                   rest_of_commit_lines: str)-> bool:
    """Check if every tag informations (name, version, changelog)
    had been set

    Args:
        message_title : commit message title
        first_line : first line of the commit message body
        rest_of_commit : rest of commit message body

    Returns:
        bool: True yes | False no
    """
    name_set = "[Release]" in message_title and len(name_set) > len("[Release]")
    version_set = "Version:" in first_line and len(first_line) > len("Version:")
    rest_of_commit = "Changelog:" in rest_of_commit_lines \
        and len(rest_of_commit_lines) > len("Changelog:")
    return name_set and version_set and rest_of_commit

def get_version_name(version_name_line:str)->str:
    """Get the version name from the line containing it

    Args:
        version_name_line (str): first line of the commit

    Returns:
        str: version name
    """
    return version_name_line.replace("[Release]","")

def get_version_number(version_number_line:str)->str:
    """Get the version name from the line containing it

    Args:
        version_number_line (str): first line of the
            commit message body

    Returns:
        str: version number
    """
    return version_number_line.replace("Version:","")

def get_version_changelog(version_changelog_lines:str)->str:
    """Get the version name from the line containing it

    Args:
        version_number_line (str): rest of the
            commit message body

    Returns:
        str: version changelog
    """
    return version_changelog_lines.replace("Changelog:","")

def write_to_changelog_file(changelog_filepath:str,name:str,number:str,changelog:str):
    """Appends to the changelog file the new version informations

    Args:
        changelog_filepath (str): filepath of the changelog file
        name (str): new version name
        number (str): new version number
        changelog (str): new version changelog
    """
    with open(changelog_filepath,'a') as file:
        current_date = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        file.write("*********************")
        file.write("New version : "+name+" | "+current_date)
        file.write("New version : "+number)
        file.write("Changelog : ")
        file.write(changelog)

def parse_commit(commit_message:str)-> tuple[str,str,str]:
    """Parse commit message for the tag and the changelog file

    Args:
        commit_message (str): Commit message

    Returns:
        tuple[str,str,str]: name of the version, version number and changelog
    """
    lines = commit_message.split("\n")
    
    commit_title = lines[0]
    first_commit_body_message_line = lines[1]
    rest_of_commit = lines[2:].join("\n")

    if are_every_information_been_set(commit_title,first_commit_body_message_line,rest_of_commit):
        name = get_version_name(commit_title)
        version_number = get_version_number(first_commit_body_message_line)
        changelog = get_version_changelog(rest_of_commit)
        
        write_to_changelog_file('CHANGELOG',name,version_number,changelog)

    else:
        print("Error in the version parsing from the commit. The last commit should be written in this way :\n"+\
              "[Release]Name of the release\n"+\
              "Version:NEW_VERSION\n"+\
              "Changelog:Changelog written(could be in multiple lines)")

def add_args(parser: argparse.ArgumentParser):
    """Add the argument list to the parser

    Args:
        parser (argparse.ArgumentParser): _description_
    """
    parser.add_argument("-c","--commit",required=True)

def create_parser()->argparse.ArgumentParser:
    """Create the parser which receives the commit
    in order to create the related tag

    Returns:
        argparse.ArgumentParser: parser
    """
    parser = argparse.ArgumentParser(
        prog="Tag commit message parser",
        description="Parse commit message to create the related tag"
    )
    add_args(parser)
    return parser

parser = create_parser()