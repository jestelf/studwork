package jetbrains.charisma.util;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
  Executes command for issues set
 */
public class IssuesUpdate {

  private static String login_url = "/rest/user/login";
  private static String execute_url = "/rest/issue/execute/";

  private String url;
  private String fname;
  private String command;
  private String login;
  private String password;
  private HttpClient client = new HttpClient();

  public static void main(String[] args) throws IOException {
    String command = "";
    for (int i = 4; i < args.length; i++) {
      command += args[i] + " ";
    }

    IssuesUpdate qf = new IssuesUpdate(args[0], args[1], args[2], args[3], command);
    qf.run();
  }

  public IssuesUpdate(String url, String fname, String login, String password, String command) {
    this.url = url;
    this.fname = fname;
    this.command = command;
    this.login = login;
    this.password = password;

    System.out.println("Command: " + command);
  }

  public void run() throws IOException {
    login();

    readFileAndExecute();
  }

  private void readFileAndExecute() throws IOException {
    BufferedReader br = new BufferedReader(new FileReader(fname));

    String s;
    while ((s = br.readLine()) != null) {
      executeForLine(s);
    }

    br.close();
  }

  private static Pattern ISSUE_ID = Pattern.compile("[A-Z]+\\-\\d+");

  private void executeForLine(String s) {
    Matcher m = ISSUE_ID.matcher(s);
    while (m.find()) {
      String issueId = m.group();
      System.out.println("Process "+ issueId);
      executeCommand(issueId);
    }
  }

  private void login() {
    try {
      PostMethod p = new PostMethod(url + login_url);
      p.addParameter("login", login);
      p.addParameter("password", password);
      client.executeMethod(p);

      if (p.getStatusCode() != 200) {
        throw new RuntimeException(p.getResponseBodyAsString());
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public void executeCommand(String issue) {
    try {
      PostMethod p = new PostMethod(url + execute_url + issue);
      p.addParameter("command", command);
      client.executeMethod(p);

      if (p.getStatusCode() != 200) {
        throw new RuntimeException(p.getResponseBodyAsString());
      }
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }


}
