import yaml
from . import PROJECT_ROOT_FOLDER

class Localisation:
    """Localisation class
    """
    def __init__(self, language: str):
        """Init a localisation class

        Args:
            language (str): language specified by the user
        """
        self._locale_prefix_file_path = "res/locale_"
        self.locale_dict = self.open_locale_file(language=language)

    def open_locale_file(self, language: str) -> dict[str]:
        """Opens the language file with contains
        locale string values

        Args:
            language (str): _description_

        Returns:
            dict: localised infos
        """
        file_path = PROJECT_ROOT_FOLDER+self._locale_prefix_file_path+language+".yaml"
        with open(file_path,encoding="utf-8") as yaml_file:
            return yaml.safe_load(yaml_file)

    def load_localised_text(self, text_id: str)-> str:
        """Returns the localised text value
        based on the language set in the project settings

        Args:
            text_id (_type_): text key

        Returns:
            str: Localised text or the text key if the
                value is not set
        """
        if text_id in self.locale_dict:
            return self.locale_dict[text_id]
        return text_id
