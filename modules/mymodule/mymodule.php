<?php
if (!defined('_PS_VERSION_'))
  exit;
 
class MyModule extends Module
{
  public function __construct()
  {
    $this->name = 'mymodule';
    $this->tab = 'others';
    $this->version = '1.0';
    $this->author = 'Pascal Huynh';
    $this->need_instance = 0;
    $this->ps_versions_compliancy = array('min' => '1.5', 'max' => '1.6');
    //$this->dependencies = array('blockcart');
 
    parent::__construct();
 
    $this->displayName = $this->l('My module');
    $this->description = $this->l('Description of my module.');
 
    $this->confirmUninstall = $this->l('Are you sure you want to uninstall?');
 
    if (!Configuration::get('MYMODULE_NAME'))      
      $this->warning = $this->l('No name provided');
  }

  /**
     * Installation du module : Installation Standard + greffe sur les hooks nécessaires
     * @return boolean
     */
    public function install()
    {
        if (
                !parent::install() || !$this->registerHook('actionCustomerAccountAdd')
        )
            return false;
 
        return true;
    }
 
    /**
     * Désintallation du module
     * @return boolean
     */
    public function uninstall()
    {
        if (!parent::uninstall())
            return false;
        return true;
    }

   /**
    * hookActionCustomerAccountAdd
    *
    * Successful customer create account
    * Called when new customer create account successfuled
    **/
    public function hookActionCustomerAccountAdd($params)
    {
    $data = $params['newCustomer'];
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		 $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		 // En-têtes additionnels
		 $headers .= 'From: contact@acbbvolley.fr' . "\r\n";

		

		$url = 'http://146.185.139.4:8080/api/customers/';
		

		// use key 'http' even if you send the request to https://...
		$options = array(
		    'http' => array(
		        'header'  => "Content-type: application/json\r\n",
		        'method'  => 'POST',
		        'content' => json_encode($data)
		    )
		);
		$context  = stream_context_create($options);
		$result = file_get_contents($url, false, $context);
		if ($result === FALSE) { /* Handle error */ }

		var_dump($result);

  mail('coucou123@yopmail.com','SUBJECT',json_encode($params['newCustomer']).json_encode($data), $headers);



	}

  /**
    * hookActionCartSave
    *
    * Cart creation and update
    * 
    **/
    public function hookActionCartSave($params)
    {

    
    }

     /**
    * hookActionAuthentication
    *
    * Successful customer authentication
    * 
    **/
    public function hookActionAuthentication($params)
    {
 
    }

}
?>