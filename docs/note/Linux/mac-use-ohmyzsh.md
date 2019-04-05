# Mac 中如何食用 oh-my-zsh

## 安装 `zsh`：

``` bash
brew install zsh
```

## 安装 `ohmyzsh`：

``` bash
cd ~ ; sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## 可能需要忽略的权限问题

详见 [oh-my-zsh/issues/6835](https://github.com/robbyrussell/oh-my-zsh/issues/6835#issuecomment-390216875)，
在 `~/.zshrc` **文件顶部添加**：

``` bash
ZSH_DISABLE_COMPFIX=true
```

## 常用插件

配置命令高亮、自动补全和输入建议等好用的插件，先下载插件到插件目录：

``` bash
cd ~/.oh-my-zsh/custom/plugins/
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git
git clone https://github.com/zsh-users/zsh-completions.git
git clone https://github.com/zsh-users/zsh-autosuggestions.git
```

在 `~/.zshrc` 的 plugins 中加入配置：

``` bash
plugins=(
        git
        brew
        zsh-syntax-highlighting
        zsh-completions
        zsh-autosuggestions
)
```

## PS：自己常用的 plugins 设置

### mac

```
plugins=(
	git
	docker
	brew
	osx
	node
	npm
	yarn
	zsh-syntax-highlighting
	zsh-completions
	zsh-autosuggestions
)
```

### centos

```
plugins=(
	git
	docker
	yum
	node
	npm
	yarn
	zsh-syntax-highlighting
	zsh-completions
	zsh-autosuggestions
)
```
